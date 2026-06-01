using Microsoft.EntityFrameworkCore;
using A_Solutions_Website_Redesign.Backend.Data;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class ServiceService : IServicesService
{
    private readonly AppDbContext _context;

    public ServiceService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ServiceResponse>> GetAllAsync()
    {
        return await _context.Services
            .Select(s => new ServiceResponse
            {
                Id = s.Id,
                Title = s.Title,
                ShortDescription = s.ShortDescription,
                IconName = s.IconName,
                DisplayOrder = s.DisplayOrder,
                IsActive = s.IsActive,
            })
            .ToListAsync();
    }

    public async Task<ServiceResponse> GetByIdAsync(int id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service == null) return null;

        return new ServiceResponse
        {
            Id = service.Id,
            Title = service.Title,
            ShortDescription = service.ShortDescription,
            IconName = service.IconName,
            DisplayOrder = service.DisplayOrder,
            IsActive = service.IsActive,
        };
    }

    public async Task<ServiceResponse> CreateAsync(ServicePostRequest request)
    {
        var service = new Service
        {
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            IconName = request.IconName,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
        };

        _context.Services.Add(service);
        await _context.SaveChangesAsync();

        return new ServiceResponse
        {
            Id = service.Id,
            Title = service.Title,
            ShortDescription = service.ShortDescription,
            IconName = service.IconName,
            DisplayOrder = service.DisplayOrder,
            IsActive = service.IsActive,
        };
    }


    public async Task<ServiceResponse> UpdateAsync(int id, ServicePatchRequest request)
    {
        var service = await _context.Services.FindAsync(id);
        if (service == null) return null;

        service.Title = request.Title;
        service.ShortDescription = request.ShortDescription;
        service.IconName = request.IconName;
        service.DisplayOrder = request.DisplayOrder;
        service.IsActive = request.IsActive;

        await _context.SaveChangesAsync();

        return new ServiceResponse
        {
            Id = service.Id,
            Title = service.Title,
            ShortDescription = service.ShortDescription,
            IconName = service.IconName,
            DisplayOrder = service.DisplayOrder,
            IsActive = service.IsActive,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service == null) return false;

        _context.Services.Remove(service);
        await _context.SaveChangesAsync();
        return true;
    }
}