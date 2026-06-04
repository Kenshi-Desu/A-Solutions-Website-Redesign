using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class CoreValuesService : CrudServiceBase<CoreValues, CoreValuesResponse, CoreValuesPostRequest, CoreValuesPatchRequest>, ICoreValuesService
{
    public CoreValuesService(Supabase.Client supabaseClient) : base(supabaseClient)
    {
    }

    protected override CoreValues MapToEntity(CoreValuesPostRequest dto)
    {
        return new CoreValues
        {
            Title = dto.Title,
            Description = dto.Description,
            DisplayOrder = dto.DisplayOrder
        };
    }

    protected override void ApplyPatch(CoreValuesPatchRequest dto, CoreValues entity)
    {
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.Description)) entity.Description = dto.Description;
        
        entity.DisplayOrder = dto.DisplayOrder;
    }

    protected override CoreValuesResponse MapToResponse(CoreValues entity)
    {
        return new CoreValuesResponse
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            DisplayOrder = entity.DisplayOrder
        };
    }
}