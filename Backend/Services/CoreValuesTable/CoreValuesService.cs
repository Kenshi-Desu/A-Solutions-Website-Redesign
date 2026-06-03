using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class CoreValuesService : ICoreValuesService
{
    private readonly Supabase.Client _supabaseClient;

    public CoreValuesService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<CoreValuesResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<CoreValues>().Get();

        return response.Models.Select(cv => new CoreValuesResponse
        {
            Id = cv.Id,
            Title = cv.Title,
            Description = cv.Description,
            DisplayOrder = cv.DisplayOrder,
        }).ToList();
    }

    public async Task<CoreValuesResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<CoreValues>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("CoreValues not found.");

        return new CoreValuesResponse
        {
            Id = response.Id,
            Title = response.Title,
            Description = response.Description,
            DisplayOrder = response.DisplayOrder,
        };
    }


    public async Task<CoreValuesResponse> CreateAsync(CoreValuesPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var CoreValues = new CoreValues
        {
            Title = request.Title,
            Description = request.Description,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<CoreValues>().Insert(CoreValues);
        var createdCoreValues = response.Model; 

        if (createdCoreValues == null)
            throw new InvalidOperationException("Failed to save record to Supabase backend database.");

        return new CoreValuesResponse
        {
            Id = createdCoreValues.Id,
            Title = createdCoreValues.Title,
            Description = createdCoreValues.Description,
            DisplayOrder = createdCoreValues.DisplayOrder,
        };
    }

    public async Task<CoreValuesResponse> UpdateAsync(int id, CoreValuesPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var CoreValuesToUpdate = new CoreValues
        {
            Id = id,
            Title = request.Title,
            Description = request.Description,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<CoreValues>().Update(CoreValuesToUpdate);
        var updatedCoreValues = response.Model;

        if (updatedCoreValues == null) 
            throw new InvalidOperationException("Failed to update CoreValues.");

        return new CoreValuesResponse
        {
            Id = updatedCoreValues.Id,
            Title = updatedCoreValues.Title,
            Description = updatedCoreValues.Description,
            DisplayOrder = updatedCoreValues.DisplayOrder,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var CoreValuesToDelete = new CoreValues { Id = id };
        
        try
        {
            await _supabaseClient.From<CoreValues>().Delete(CoreValuesToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
