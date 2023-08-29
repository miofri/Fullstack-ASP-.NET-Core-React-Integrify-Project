using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction;

public interface IOrderProductService
    : IBaseService<
        OrderProducts,
        OrderProductReadDto,
        OrderProductCreateDto,
        OrderProductUpdateDto
    > { }
