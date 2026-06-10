using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class CoreValuesService : CrudServiceBase<CoreValues, CoreValuesResponse, CoreValuesPostRequest, CoreValuesPatchRequest>, ICoreValuesService
{
    public CoreValuesService(Supabase.Client supabaseClient, ILogger<CoreValuesService> logger) : base(supabaseClient, logger)
    {
    }

    protected override CoreValues MapToEntity(CoreValuesPostRequest dto)
    {
        return new CoreValues
        {
            IconName = dto.IconName,
            Title = dto.Title,
            Description = dto.Description,
            DisplayOrder = dto.DisplayOrder
        };
    }

    protected override void ApplyPatch(CoreValuesPatchRequest dto, CoreValues entity)
    {
        if (!string.IsNullOrEmpty(dto.IconName)) entity.IconName = dto.IconName;
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.Description)) entity.Description = dto.Description;
        
        entity.DisplayOrder = dto.DisplayOrder;
    }

    protected override CoreValuesResponse MapToResponse(CoreValues entity)
    {
        return new CoreValuesResponse
        {
            Id = entity.Id,
            IconName = entity.IconName,
            Title = entity.Title,
            Description = entity.Description,
            DisplayOrder = entity.DisplayOrder
        };
    }
}