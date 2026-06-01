using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IServicesService
{
    Task<IEnumerable<ServiceResponse>> GetAllAsync();
    Task<ServiceResponse> GetByIdAsync(int id);
    Task<ServiceResponse> CreateAsync(ServicePostRequest request);
    Task<ServiceResponse> UpdateAsync(int id, ServicePatchRequest request);
    Task<bool> DeleteAsync(int id);
}
