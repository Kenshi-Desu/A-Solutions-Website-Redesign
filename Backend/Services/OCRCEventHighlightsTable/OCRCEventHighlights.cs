using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCEventHighlightsService : CrudServiceBase<OCRCEventHighlights, OCRCEventHighlightsResponse, OCRCEventHighlightsPostRequest, OCRCEventHighlightsPatchRequest>, IOCRCEventHighlightsService
{
    public OCRCEventHighlightsService(Supabase.Client supabaseClient, ILogger<OCRCEventHighlightsService> logger) : base(supabaseClient, logger)
    {
    }

    protected override OCRCEventHighlights MapToEntity(OCRCEventHighlightsPostRequest dto)
    {
        return new OCRCEventHighlights
        {
            EventYear = dto.EventYear,
            Title = dto.Title,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            DisplayOrder = dto.DisplayOrder
        };
    }

    protected override void ApplyPatch(OCRCEventHighlightsPatchRequest dto, OCRCEventHighlights entity)
    {
        entity.EventYear = dto.EventYear;
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.Description)) entity.Description = dto.Description;
        if (!string.IsNullOrEmpty(dto.ImageUrl)) entity.ImageUrl = dto.ImageUrl;
        entity.DisplayOrder = dto.DisplayOrder;
    }

    protected override OCRCEventHighlightsResponse MapToResponse(OCRCEventHighlights entity)
    {
        return new OCRCEventHighlightsResponse
        {
            Id = entity.Id,
            EventYear = entity.EventYear,
            Title = entity.Title,
            Description = entity.Description,
            ImageUrl = entity.ImageUrl,
            DisplayOrder = entity.DisplayOrder
        };
    }
}