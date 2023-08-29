using AutoMapper;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApiBusiness.Implementations;

public class OrderProductService
    : BaseService<OrderProducts, OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>,
        IOrderProductService
{
    private readonly IOrderProduct _orderProductRepo;

    public OrderProductService(IOrderProduct orderProductRepo, IMapper mapper)
        : base(orderProductRepo, mapper)
    {
        _orderProductRepo = orderProductRepo;
    }
}
