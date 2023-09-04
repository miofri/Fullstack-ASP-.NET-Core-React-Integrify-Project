using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction;

public interface IOrderService : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
{
    Task<ActionResult<OrderReadDto>> CreateOrderAndOrderProducts(OrderCreateDto entity, Guid newId);
    Task<List<OrderReadDto>> GetOrderByUserIdAsync(Guid id);
}
