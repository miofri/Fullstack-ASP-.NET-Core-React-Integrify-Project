using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiBusiness.Abstraction;

public interface IProductService
  : IBaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto> { }