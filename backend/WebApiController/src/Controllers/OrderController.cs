using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;
using WebApiDomain.Shared;

namespace WebApiController.Controllers;

[Microsoft.AspNetCore.Cors.EnableCors("Policy1")]
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
            return StatusCode(401, dto);
        }

        var userId = userIdClaim.Value;
        if (!Guid.TryParse(userId, out Guid newId))
        {
            return StatusCode(400, dto);
        }

        var dtoWithId = await _orderService.CreateOrderAndOrderProducts(dto, newId);

        return Ok(dtoWithId);
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<IEnumerable<OrderReadDto>>> GetAll(
        [FromQuery] QueryOptions queryOptions
    )
    {
        return Ok(await _orderService.GetAll(queryOptions));
    }

    [HttpGet("/api/v1/orders/userid/{id:Guid}")]
    public virtual async Task<ActionResult<IEnumerable<OrderReadDto>>> GetOrderByUserId(
        [FromRoute] Guid id
    )
    {
        return Ok(await _orderService.GetOrderByUserIdAsync(id));
    }
}
