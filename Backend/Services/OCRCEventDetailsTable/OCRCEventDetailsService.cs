using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCEventDetailsService : SingletonServiceBase<OCRCEventDetails, OCRCEventDetailsResponse, OCRCEventDetailsPatchRequest>, IOCRCEventDetailsService
{
    public OCRCEventDetailsService(Supabase.Client supabaseClient, ILogger<OCRCEventDetailsService> logger) : base(supabaseClient, logger)
    {
    }

    protected override void ApplyPatch(OCRCEventDetailsPatchRequest dto, OCRCEventDetails entity)
    {
        entity.EventDate = dto.EventDate;
        if (!string.IsNullOrEmpty(dto.EventTime)) entity.EventTime = dto.EventTime;
        if (!string.IsNullOrEmpty(dto.VenueName)) entity.VenueName = dto.VenueName;
        if (!string.IsNullOrEmpty(dto.Eligibility)) entity.Eligibility = dto.Eligibility;
        if (!string.IsNullOrEmpty(dto.RulesPdfUrl)) entity.RulesPdfUrl = dto.RulesPdfUrl;
    }

    protected override OCRCEventDetailsResponse MapToResponse(OCRCEventDetails entity)
    {
        return new OCRCEventDetailsResponse
        {
            Id = entity.Id,
            EventDate = entity.EventDate,
            EventTime = entity.EventTime,
            VenueName = entity.VenueName,
            Eligibility = entity.Eligibility,
            RulesPdfUrl = entity.RulesPdfUrl,
        };
    }
}