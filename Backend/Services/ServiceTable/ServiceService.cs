using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class ServiceService : CrudServiceBase<Service, ServiceResponse, ServicePostRequest, ServicePatchRequest>, IServiceService
{
    public ServiceService(Supabase.Client supabaseClient) : base(supabaseClient)
    {
    }

    protected override Service MapToEntity(ServicePostRequest dto)
    {
        return new Service
        {
            Title = dto.Title,
            ShortDescription = dto.ShortDescription,
            IconName = dto.IconName,
            DisplayOrder = dto.DisplayOrder,
            IsActive = dto.IsActive
        };
    }

    protected override void ApplyPatch(ServicePatchRequest dto, Service entity)
    {
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.ShortDescription)) entity.ShortDescription = dto.ShortDescription;
        if (!string.IsNullOrEmpty(dto.IconName)) entity.IconName = dto.IconName;
        entity.DisplayOrder = dto.DisplayOrder;
        entity.IsActive = dto.IsActive;
    }

    protected override ServiceResponse MapToResponse(Service entity)
    {
        return new ServiceResponse
        {
            Id = entity.Id,
            Title = entity.Title,
            ShortDescription = entity.ShortDescription,
            IconName = entity.IconName,
            DisplayOrder = entity.DisplayOrder,
            IsActive = entity.IsActive
        };
    }
}