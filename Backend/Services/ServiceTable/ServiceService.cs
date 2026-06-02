using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class ServiceService : IServiceService
{
    private readonly Supabase.Client _supabaseClient;

    public ServiceService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<ServiceResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<Service>().Get();

        return response.Models.Select(s => new ServiceResponse
            {
                Id = s.Id,
                Title = s.Title,
                ShortDescription = s.ShortDescription,
                IconName = s.IconName,
                DisplayOrder = s.DisplayOrder,
                IsActive = s.IsActive,
            })
            .ToList();
    }

    public async Task<ServiceResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<Service>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single();

        if (response == null) throw new InvalidOperationException("Service not found.");

        return new ServiceResponse
        {
            Id = response.Id,
            Title = response.Title,
            ShortDescription = response.ShortDescription,
            IconName = response.IconName,
            DisplayOrder = response.DisplayOrder,
            IsActive = response.IsActive,
        };
    }

    public async Task<ServiceResponse> CreateAsync(ServicePostRequest request)
    {
        await _supabaseClient.InitializeAsync();
        
        var service = new Service
        {
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            IconName = request.IconName,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
        };

        var response = await _supabaseClient.From<Service>().Insert(service);
        var createdService = response.Model;
        
        if (createdService == null) 
            throw new InvalidOperationException("Failed to create service.");

        return new ServiceResponse
        {
            Id = createdService.Id,
            Title = createdService.Title,
            ShortDescription = createdService.ShortDescription,
            IconName = createdService.IconName,
            DisplayOrder = createdService.DisplayOrder,
            IsActive = createdService.IsActive,
        };
    }


    public async Task<ServiceResponse> UpdateAsync(int id, ServicePatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var serviceToUpdate = new Service
        {
            Id = id,
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            IconName = request.IconName,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
        };

        var response = await _supabaseClient.From<Service>().Update(serviceToUpdate);
        var updatedService = response.Model;

        if (updatedService == null) 
            throw new InvalidOperationException("Failed to update service.");

        return new ServiceResponse
        {
            Id = updatedService.Id,
            Title = updatedService.Title,
            ShortDescription = updatedService.ShortDescription,
            IconName = updatedService.IconName,
            DisplayOrder = updatedService.DisplayOrder,
            IsActive = updatedService.IsActive,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var serviceToDelete = new Service { Id = id };

        try
        {
            await _supabaseClient.From<Service>().Delete(serviceToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}