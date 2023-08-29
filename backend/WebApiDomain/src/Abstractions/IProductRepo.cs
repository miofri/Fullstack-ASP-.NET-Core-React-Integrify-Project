using WebApiDomain.Entities;

namespace WebApiDomain.Abstractions
{
    public interface IProductRepo : IBaseRepo<Product>
    {
        Task<List<Product>> GetFiltered(List<Guid> ids);
    }
}
