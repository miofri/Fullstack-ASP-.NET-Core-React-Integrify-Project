using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApiBusiness.Implementations;

public class OrderService: BaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>, IOrderService
{
  private readonly IOrderRepo _orderRepo;

  public OrderService(IOrderRepo orderRepo, IMapper mapper) : base(orderRepo, mapper)
  {
    _orderRepo = orderRepo;
  }

  public OrderCreateWithIdDto ConvertToDtoWithId(OrderCreateDto entity)
  {
    var newEntity =  _mapper.Map<OrderCreateWithIdDto>(entity);
    return newEntity;
  }
  public async Task<OrderReadDto> CreateOneWithId(OrderCreateWithIdDto dto)
  {
    var entity = await _orderRepo.CreateOne(_mapper.Map<Order>(dto));
    return _mapper.Map<OrderReadDto>(entity);
  }
}
