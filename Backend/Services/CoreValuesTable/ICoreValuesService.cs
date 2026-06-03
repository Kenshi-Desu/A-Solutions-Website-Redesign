using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface ICoreValuesService
{
    Task<IEnumerable<CoreValuesResponse>> GetAllAsync();
    Task<CoreValuesResponse> GetByIdAsync(int id);
    Task<CoreValuesResponse> CreateAsync(CoreValuesPostRequest request);
    Task<CoreValuesResponse> UpdateAsync(int id, CoreValuesPatchRequest request);
    Task<bool> DeleteAsync(int id);
}