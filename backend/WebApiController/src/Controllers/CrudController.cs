using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiDomain.Shared;

namespace WebApiController.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class CrudController<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
    {
        private readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;

        public CrudController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> baseService)
        {
            _baseService = baseService;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll(
            [FromQuery] QueryOptions queryOptions
        )
        {
            return Ok(await _baseService.GetAll(queryOptions));
        }

        [HttpGet("{id:Guid}")]
        public virtual async Task<ActionResult<TReadDto>> GetOneById([FromRoute] Guid id)
        {
            return Ok(await _baseService.GetOneById(id));
        }

        [HttpPost]
        public virtual async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto)
        {
            var createdObject = await _baseService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createdObject);
        }

        [HttpPatch("{id:Guid}")]
        public virtual async Task<ActionResult<TReadDto>> UpdateOneById(
            [FromRoute] Guid id,
            [FromForm] TUpdateDto update
        )
        {
            var updatedObject = await _baseService.UpdateOneById(id, update);
            return Ok(updatedObject);
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
        {
            var deletedObject = await _baseService.DeleteOneById(id);
            return Ok(deletedObject);
        }
    }
}
