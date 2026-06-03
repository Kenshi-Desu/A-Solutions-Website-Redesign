using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IContactSettingsService
{
    Task<IEnumerable<ContactSettingsResponse>> GetAllAsync();
    Task<ContactSettingsResponse> GetByIdAsync(int id);
    Task<ContactSettingsResponse> CreateAsync(ContactSettingsPostRequest request);
    Task<ContactSettingsResponse> UpdateAsync(int id, ContactSettingsPatchRequest request);
    Task<bool> DeleteAsync(int id);
}