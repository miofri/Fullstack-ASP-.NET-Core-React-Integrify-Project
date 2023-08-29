using WebApiDomain.Entities;

namespace WebApiDomain.Abstractions
{
    public interface IOrderProduct : IBaseRepo<OrderProducts>
    {
        Task AddOrderProductsToOrder(Order order);
    }
}
