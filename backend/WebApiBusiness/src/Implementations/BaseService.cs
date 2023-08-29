using AutoMapper;
using WebApiBusiness.Abstraction;
using WebApiDomain.Abstractions;
using WebApiDomain.Shared;

namespace WebApiBusiness.Implementations
{
    public class BaseService<T, TReadDto, TCreateDto, TUpdateDto>
        : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
        {
            _baseRepo = baseRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
        {
            var result = await _baseRepo.GetAll(queryOptions);
            return _mapper.Map<IEnumerable<TReadDto>>(result);
        }

        public async Task<bool> DeleteOneById(Guid id)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            if (foundItem is null)
            {
                return false;
            }
            await _baseRepo.DeleteOneById(foundItem);
            return true;
        }

        public async Task<TReadDto> GetOneById(Guid id)
        {
            var entity = await _baseRepo.GetOneById(id);
            var dto = _mapper.Map<TReadDto>(entity);
            return dto;
        }

        public async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            if (foundItem is null)
            {
                throw new Exception("Item not found");
            }
            var entity = _mapper.Map(updated, foundItem);
            var updatedEntity = await _baseRepo.UpdateOneById(entity);
            return _mapper.Map<TReadDto>(updatedEntity);
        }

        public virtual async Task<TReadDto> CreateOne(TCreateDto dto)
        {
            var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
    }
}
