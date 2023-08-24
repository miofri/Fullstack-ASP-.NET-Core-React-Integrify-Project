using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction;

public interface IOrderService
  : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
{
  OrderCreateWithIdDto ConvertToDtoWithId(OrderCreateDto entity);
  Task<OrderReadDto> CreateOneWithId(OrderCreateWithIdDto dto);
}

