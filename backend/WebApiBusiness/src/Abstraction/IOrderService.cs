using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction;

public interface IOrderService
  : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
{
  Task<ActionResult<Order>> ConvertToDtoWithId(OrderCreateDto entity, Guid newId);
}

