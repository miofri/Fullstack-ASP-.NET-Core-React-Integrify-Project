using AutoMapper;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApiBusiness.Implementations;

public class ProductService: BaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>, IProductService
{
  private readonly IProductRepo _productRepo;
  
  public ProductService(IProductRepo productRepo, IMapper mapper) : base(productRepo, mapper)
  {
    _productRepo = productRepo;
  }
}
