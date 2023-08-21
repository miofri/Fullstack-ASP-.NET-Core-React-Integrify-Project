using WebApiDomain.Shared;

namespace WebApiBusiness.Abstraction;

public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
    Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);

    Task<TReadDto> GetOneById(Guid id);

    Task<TReadDto> UpdateOneById(Guid id, TUpdateDto entity);

    Task<bool> DeleteOneById(Guid id);
    Task<TReadDto> CreateOne(TCreateDto dto);
}