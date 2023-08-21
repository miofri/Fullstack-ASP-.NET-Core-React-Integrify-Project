using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;

namespace WebApiController.Controllers
{
	public class ProductController : CrudController<Product, ProductReadDto,
		ProductCreateDto, ProductUpdateDto>
	{
		public ProductController(IProductService baseService) : base(baseService)
		{
		}
	}
}