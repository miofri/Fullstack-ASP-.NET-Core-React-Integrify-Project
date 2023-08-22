using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<UserUpdateDto> UpdatePassword(Guid id, string newPassword);
        // UserDto GetProfile(string id); -- only in controller
        Task<UserReadDto> CreateAdmin(UserCreateDto dto);
    }
}
