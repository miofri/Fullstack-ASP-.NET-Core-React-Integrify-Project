 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using WebApiBusiness.Abstraction;
 using WebApiBusiness.Dtos;
 using WebApiDomain.Entities;
 using WebApiDomain.Shared;

 namespace WebApiController.Controllers
{
    // [Authorize]
    public class UserController : CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService; // not necessary if no extra method needed?
        
        public UserController(IUserService userService) : base(userService)
        {
            _userService = userService;
        }
        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }
        [Authorize(Roles =  "Admin")]
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll(QueryOptions queryOptions)
        {
            return Ok(await _userService.GetAll(queryOptions));
        }
        // [AllowAnonymous]
        [Authorize(Policy = "EmailWhiteList")]
        public override async Task<ActionResult<UserReadDto>> GetOneById(Guid id)
        {
            return Ok(await _userService.GetOneById(id));
        }
        
    }
}