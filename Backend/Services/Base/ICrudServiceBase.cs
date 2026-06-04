namespace A_Solutions_Website_Redesign.Backend.Services.Base;

public interface ICrudServiceBase<TResponseDto, TPostDto, TPatchDto>
{
    Task<IEnumerable<TResponseDto>> GetAllAsync();
    Task<TResponseDto> GetByIdAsync(int id);
    Task<TResponseDto> CreateAsync(TPostDto dto);
    Task<TResponseDto> UpdateAsync(int id, TPatchDto dto);
    Task DeleteAsync(int id);
}