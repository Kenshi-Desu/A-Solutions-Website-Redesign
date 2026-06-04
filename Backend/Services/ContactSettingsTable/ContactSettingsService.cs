using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class ContactSettingsService : SingletonServiceBase<ContactSettings, ContactSettingsResponse, ContactSettingsPatchRequest>, IContactSettingsService
{
    public ContactSettingsService(Supabase.Client supabaseClient) : base(supabaseClient)
    {
    }

    protected override void ApplyPatch(ContactSettingsPatchRequest dto, ContactSettings entity)
    {
        if (!string.IsNullOrEmpty(dto.ContactPhone)) entity.ContactPhone = dto.ContactPhone;
        if (!string.IsNullOrEmpty(dto.ContactEmail)) entity.ContactEmail = dto.ContactEmail;
        if (!string.IsNullOrEmpty(dto.PhysicalAddress)) entity.PhysicalAddress = dto.PhysicalAddress;
        if (!string.IsNullOrEmpty(dto.BusinessHours)) entity.BusinessHours = dto.BusinessHours;
    }

    protected override ContactSettingsResponse MapToResponse(ContactSettings entity)
    {
        return new ContactSettingsResponse
        {
            Id = entity.Id,
            ContactPhone = entity.ContactPhone,
            ContactEmail = entity.ContactEmail,
            PhysicalAddress = entity.ContactEmail,
            BusinessHours = entity.BusinessHours
        };
    }
}