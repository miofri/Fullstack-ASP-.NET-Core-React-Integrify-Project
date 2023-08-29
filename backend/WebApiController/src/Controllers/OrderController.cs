using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiController.Controllers;

public class OrderController : CrudController<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
        : base(orderService)
    {
        _orderService = orderService;
    }

    public override async Task<ActionResult<OrderReadDto>> CreateOne([FromBody] OrderCreateDto dto)
    {
        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return StatusCode(400, dto);
        }

        var userId = userIdClaim.Value;
        if (!Guid.TryParse(userId, out Guid newId))
        {
            return StatusCode(400, dto);
        }

        var dtoWithId = await _orderService.ConvertToDtoWithId(dto, newId);
        return Ok(dtoWithId);
    }
}

// string authorizationHeader = HttpContext.Request.Headers["Authorization"];

// if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
// {
//   // Extract the token without the "Bearer " prefix
//   string token = authorizationHeader.Substring("Bearer ".Length).Trim();
//   Console.WriteLine(token);
//   // Initialize the JwtSecurityTokenHandler
//   var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
//   // Decode the token
//   var tokenValidationParameters = new TokenValidationParameters
//   {
//     ValidateIssuerSigningKey = true,
//     IssuerSigningKey =
//       new SymmetricSecurityKey(
//         Encoding.UTF8.GetBytes("my-secret-key-the-secret-sauce-is-spaghetti-sauce-which-tastes-really-good")),
//     ValidateIssuer = true,
//     ValidIssuer = "ecommerce-backend",
//     ValidateAudience = false, // You might want to validate audience as well
//     ValidateLifetime = true,
//     ClockSkew = TimeSpan.Zero // Disable the clock skew
//   };
//   var principal = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out _);
//   var userIdClaim = principal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
//   if (userIdClaim == null)
//   {
//     return StatusCode(400, dto);
//   }
//   var userId = userIdClaim.Value;
//   if (!Guid.TryParse(userId, out Guid newId))
//   {
//     return StatusCode(400, dto);
//   }
//   Console.WriteLine("HERE COMES THE NEW ID");

//   var dtoWithId = await _orderService.ConvertToDtoWithId(dto, newId);
//   return Ok(dtoWithId);
// }
// return StatusCode(400, dto);
