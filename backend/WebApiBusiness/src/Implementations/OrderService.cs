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

    public async Task<ActionResult<Order>> ConvertToDtoWithId(OrderCreateDto entity, Guid newId)
    {
        var productsAndAmount = entity.ProductsAndAmount;
        var products = await GetProductsAsync(entity.ProductsAndAmount);
        var foundUser = await _userRepo.GetOneById(newId) ?? throw new Exception("User not found");

        var convertedEntity = _mapper.Map<Order>(entity);
        convertedEntity.User = foundUser;
        convertedEntity.Status = OrderStatus.Processing;
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
            Console.WriteLine("Should be in the  loop now");

            convertedEntity.OrderProducts.Add(orderProduct);
        }
        await _orderProductRepo.AddOrderProductsToOrder(convertedEntity);
        var savedEntity = await _orderRepo.CreateOneOrder(convertedEntity);
        return savedEntity;
    }

    public async Task<List<Product>> GetProductsAsync(List<OrderProductsDto> orderProductsList)
    {
        List<Guid> productIdsList = orderProductsList
            .Select(orderProduct => orderProduct.ProductId)
            .ToList();
        return await _productRepo.GetFiltered(productIdsList);
    }
}
