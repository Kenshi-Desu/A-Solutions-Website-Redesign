using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class ContactSettingsService : IContactSettingsService
{
    private readonly Supabase.Client _supabaseClient;

    public ContactSettingsService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<ContactSettingsResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<ContactSettings>().Get();

        return response.Models.Select(cs => new ContactSettingsResponse
        {
            Id = cs.Id,
            ContactPhone = cs.ContactPhone,
            ContactEmail = cs.ContactEmail,
            PhysicalAddress = cs.PhysicalAddress,
            BusinessHours = cs.BusinessHours,
        }).ToList();
    }

    public async Task<ContactSettingsResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<ContactSettings>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("ContactSettings not found.");

        return new ContactSettingsResponse
        {
            Id = response.Id,
            ContactPhone = response.ContactPhone,
            ContactEmail = response.ContactEmail,
            PhysicalAddress = response.PhysicalAddress,
            BusinessHours = response.BusinessHours,
        };
    }


    public async Task<ContactSettingsResponse> CreateAsync(ContactSettingsPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var ContactSettings = new ContactSettings
        {
            ContactPhone = request.ContactPhone,
            ContactEmail = request.ContactEmail,
            PhysicalAddress = request.PhysicalAddress,
            BusinessHours = request.BusinessHours,
        };

        var response = await _supabaseClient.From<ContactSettings>().Insert(ContactSettings);
        var createdContactSettings = response.Model; 

        if (createdContactSettings == null)
            throw new InvalidOperationException("Failed to save record to Supabase backend database.");

        return new ContactSettingsResponse
        {
            Id = createdContactSettings.Id,
            ContactPhone = createdContactSettings.ContactPhone,
            ContactEmail = createdContactSettings.ContactEmail,
            PhysicalAddress = createdContactSettings.PhysicalAddress,
            BusinessHours = createdContactSettings.BusinessHours,
        };
    }

    public async Task<ContactSettingsResponse> UpdateAsync(int id, ContactSettingsPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var ContactSettingsToUpdate = new ContactSettings
        {
            Id = id,
            ContactPhone = request.ContactPhone,
            ContactEmail = request.ContactEmail,
            PhysicalAddress = request.PhysicalAddress,
            BusinessHours = request.BusinessHours,
        };

        var response = await _supabaseClient.From<ContactSettings>().Update(ContactSettingsToUpdate);
        var updatedContactSettings = response.Model;

        if (updatedContactSettings == null) 
            throw new InvalidOperationException("Failed to update ContactSettings.");

        return new ContactSettingsResponse
        {
            Id = updatedContactSettings.Id,
            ContactPhone = updatedContactSettings.ContactPhone,
            ContactEmail = updatedContactSettings.ContactEmail,
            PhysicalAddress = updatedContactSettings.PhysicalAddress,
            BusinessHours = updatedContactSettings.BusinessHours,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var ContactSettingsToDelete = new ContactSettings { Id = id };
        
        try
        {
            await _supabaseClient.From<ContactSettings>().Delete(ContactSettingsToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
