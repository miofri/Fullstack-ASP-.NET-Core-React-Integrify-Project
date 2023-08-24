using AutoMapper;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApi.Configurations;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    {
      CreateMap<User, UserReadDto>();
      CreateMap<UserUpdateDto, User>();
      CreateMap<UserCreateDto, User>();
      CreateMap<Product, ProductReadDto>();
      CreateMap<ProductCreateDto, Product>();
      CreateMap<ProductUpdateDto, Product>();
      CreateMap<Order, OrderReadDto>();
      CreateMap<OrderCreateDto, Order>();
      CreateMap<OrderCreateDto, OrderReadDto>();
      CreateMap<OrderUpdateDto, Order>();
      
    }
  }
}
