using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCTimelineService : CrudServiceBase<OCRCTimeline, OCRCTimelineResponse, OCRCTimelinePostRequest, OCRCTimelinePatchRequest>, IOCRCTimelineService
{
    public OCRCTimelineService(Supabase.Client supabaseClient, ILogger<OCRCTimelineService> logger) : base(supabaseClient, logger)
    {
    }

    protected override OCRCTimeline MapToEntity(OCRCTimelinePostRequest dto)
    {
        return new OCRCTimeline
        {
            TimelineYear = dto.TimelineYear,
            Title = dto.Title,
            EventDescription = dto.EventDescription,
            DisplayOrder = dto.DisplayOrder
        };
    }

    protected override void ApplyPatch(OCRCTimelinePatchRequest dto, OCRCTimeline entity)
    {
        if (dto.TimelineYear != 0) entity.TimelineYear = dto.TimelineYear;
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.EventDescription)) entity.EventDescription = dto.EventDescription;
        entity.DisplayOrder = dto.DisplayOrder;
    }

    protected override OCRCTimelineResponse MapToResponse(OCRCTimeline entity)
    {
        return new OCRCTimelineResponse
        {
            Id = entity.Id,
            TimelineYear = entity.TimelineYear,
            Title = entity.Title,
            EventDescription = entity.EventDescription,
            DisplayOrder = entity.DisplayOrder
        };
    }
}