using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiController.Controllers;

[Microsoft.AspNetCore.Cors.EnableCors("Policy1")]
public class OrderProductController
    : CrudController<
        OrderProducts,
        OrderProductReadDto,
        OrderProductCreateDto,
        OrderProductUpdateDto
    >
{
    private readonly IOrderProductService _orderProductService;

    public OrderProductController(IOrderProductService orderProductService)
        : base(orderProductService)
    {
        _orderProductService = orderProductService;
    }

    [HttpGet("orderid/{id:Guid}")]
    public async Task<ActionResult<List<OrderProductReadDto>>> GetOneByOrderId([FromRoute] Guid id)
    {
        return Ok(await _orderProductService.GetByOrderId(id));
    }
}
