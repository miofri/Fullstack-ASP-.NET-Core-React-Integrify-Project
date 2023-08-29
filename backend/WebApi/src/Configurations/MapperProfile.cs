using AutoMapper;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.Configurations;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        {
            CreateMap<User, UserReadDto>();
            CreateMap<User, OrderReadDto>();
            // CreateMap<Order, OrderReadDto>()
            //     .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id));
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, User>();
            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();
            CreateMap<Order, OrderReadDto>();
            CreateMap<Order, OrderProductReadDto>();
            CreateMap<Order, OrderProductsDto>();
            CreateMap<OrderCreateDto, Order>();
            CreateMap<OrderCreateDto, OrderReadDto>();
            CreateMap<OrderUpdateDto, Order>();
            CreateMap<OrderProducts, OrderProductReadDto>();
        }
    }
}

//Order -> OrderProductReadDto
