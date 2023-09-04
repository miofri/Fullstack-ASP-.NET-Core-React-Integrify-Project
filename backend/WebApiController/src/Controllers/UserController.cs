using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Infrastructure;
using Npgsql;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;
using WebApiDomain.Shared;

namespace WebApiController.Controllers;

[Microsoft.AspNetCore.Cors.EnableCors("Policy1")]
public class UserController : CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
    private readonly IUserService _userService; // not necessary if no extra method needed?

    public UserController(IUserService userService)
        : base(userService)
    {
        _userService = userService;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("admin")]
    public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
    {
        return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll(
        QueryOptions queryOptions
    )
    {
        return Ok(await _userService.GetAll(queryOptions));
    }

    public override async Task<ActionResult<UserReadDto>> GetOneById(Guid id)
    {
        return Ok(await _userService.GetOneById(id));
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
    {
        var deletedObject = await _userService.DeleteOneById(id);
        return Ok(deletedObject);
    }

    public override async Task<ActionResult<UserReadDto>> CreateOne([FromBody] UserCreateDto dto)
    {
        try
        {
            var createdObject = await _userService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createdObject);
        }
        catch (Exception ex)
        {
            if (ex.InnerException is PostgresException pgException)
            {
                string[] parts = pgException.Message.Split(':');
                if (parts.Length > 1)
                {
                    string errorCode = parts[0].Trim();
                    Console.WriteLine(errorCode);
                    return StatusCode(409, "Email exists");
                }
            }
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }
}
