using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Entities;
using WebApiDomain.Shared;

namespace WebApiController.Controllers;

[Microsoft.AspNetCore.Cors.EnableCors("Policy1")]
public class ProductController
    : CrudController<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
        : base(productService)
    {
        _productService = productService;
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<ProductReadDto>> CreateOne(
        [FromBody] ProductCreateDto dto
    )
    {
        var createdObject = await _productService.CreateOne(dto);
        return CreatedAtAction(nameof(CreateOne), createdObject);
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<ProductReadDto>> UpdateOneById(
        [FromRoute] Guid id,
        [FromForm] ProductUpdateDto update
    )
    {
        var updatedObject = await _productService.UpdateOneById(id, update);
        return Ok(updatedObject);
    }

    [Authorize(Roles = "Admin")]
    public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
    {
        var deletedObject = await _productService.DeleteOneById(id);
        return Ok(deletedObject);
    }
}
