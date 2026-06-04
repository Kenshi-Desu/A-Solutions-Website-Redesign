namespace A_Solutions_Website_Redesign.Backend.Services.Base;

public interface ISingletonServiceBase<TResponseDto, TPatchDto>
{
    Task<TResponseDto> GetAsync();
    Task<TResponseDto> UpdateAsync(TPatchDto dto);
}