using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApiBusiness.Implementations;

public class OrderService
    : BaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>,
        IOrderService
{
    private readonly IOrderRepo _orderRepo;
    private readonly IUserRepo _userRepo;
    private readonly IProductRepo _productRepo;
    private readonly IOrderProduct _orderProductRepo;

    public OrderService(
        IOrderRepo orderRepo,
        IUserRepo userRepo,
        IProductRepo productRepo,
        IOrderProduct orderProductRepo,
        IMapper mapper
    )
        : base(orderRepo, mapper)
    {
        _productRepo = productRepo;
        _orderRepo = orderRepo;
        _userRepo = userRepo;
        _orderProductRepo = orderProductRepo;
    }

    public async Task<ActionResult<OrderReadDto>> CreateOrderAndOrderProducts(
        OrderCreateDto entity,
        Guid newId
    )
    {
        var foundUser = await _userRepo.GetOneById(newId) ?? throw new Exception("User not found");
        var convertedEntity = _mapper.Map<Order>(entity);
        convertedEntity.User = foundUser;
        convertedEntity.Status = OrderStatus.Processing;
        var savedEntity = await _orderRepo.CreateOneOrder(convertedEntity);

        var products = await GetProductsAsync(entity.ProductsAndAmount);
        var productsAndAmount = entity.ProductsAndAmount;
        convertedEntity.OrderProducts = new List<OrderProducts>();

        for (int i = 0; i < products.Count; i++)
        {
            var product = products[i];
            var amount = productsAndAmount[i].Amount;
            var orderProduct = new OrderProducts
            {
                Product = product,
                Amount = amount,
                Order = convertedEntity
            };
            convertedEntity.OrderProducts.Add(orderProduct);
        }
        await _orderProductRepo.AddOrderProductsToOrder(convertedEntity);
        return _mapper.Map<OrderReadDto>(savedEntity);
    }

    public async Task<List<Product>> GetProductsAsync(List<OrderProductsDto> orderProductsList)
    {
        List<Guid> productIdsList = orderProductsList
            .Select(orderProduct => orderProduct.ProductId)
            .ToList();
        return await _productRepo.GetFiltered(productIdsList);
    }

    public async Task<List<OrderReadDto>> GetOrderByUserIdAsync(Guid id)
    {
        var result = await _orderRepo.GetOrderByUserIdAsync(id);
        return _mapper.Map<List<OrderReadDto>>(result);
    }
}
