using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;
using WebApiDomain.Shared;

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

        var dtoWithId = await _orderService.CreateOrderAndOrderProducts(dto, newId);

        return Ok(dtoWithId);
    }

    // public override async Task<ActionResult<IEnumerable<OrderReadDto>>> GetAll(
    //     [FromQuery] QueryOptions queryOptions
    // ) {
    //     var result = await _orderService.GetAll(queryOptions);
    //     foreach (var order in result){
    //         Guid.TryParse(order.UserId, out Guid parsedId);
    //         order.UserId =
    //     }
    // }
}
