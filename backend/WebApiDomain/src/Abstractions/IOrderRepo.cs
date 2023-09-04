using WebApiDomain.Entities;

namespace WebApiDomain.Abstractions;

public interface IOrderRepo : IBaseRepo<Order>
{
    Task<Order> CreateOneOrder(Order entity);
    Task<List<Order>> GetOrderByUserIdAsync(Guid id);
}
