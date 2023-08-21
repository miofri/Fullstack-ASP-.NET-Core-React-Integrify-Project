using WebApiDomain.Entities;

namespace WebApiDomain.Abstractions
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User> CreateAdmin(User user);
        Task<User?> FindOneByEmail(string email);
        Task<User> UpdatePassword(User user);
    }
}
