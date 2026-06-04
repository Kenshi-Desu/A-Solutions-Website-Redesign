using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IContactSettingsService : ISingletonServiceBase<ContactSettingsResponse, ContactSettingsPatchRequest>
{
}