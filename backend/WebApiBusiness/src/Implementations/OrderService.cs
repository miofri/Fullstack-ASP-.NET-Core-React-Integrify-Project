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
  private readonly IUserRepo _userRepo;

  public OrderService(IOrderRepo orderRepo, IUserRepo userRepo, IMapper mapper) : base(orderRepo, mapper)
  {
    _orderRepo = orderRepo;
    _userRepo = userRepo;
  }

  public async Task<ActionResult<Order>> ConvertToDtoWithId(OrderCreateDto entity, Guid newId)
  {
    var foundUser = await _userRepo.GetOneById(newId) ?? throw new Exception("User not found");
    var convertedEntity = _mapper.Map<Order>(entity);
    convertedEntity.User = foundUser; // Set the UserId on the Order entity
    var savedEntity = await _orderRepo.CreateOneOrder(convertedEntity);
    return savedEntity;
  }
}
