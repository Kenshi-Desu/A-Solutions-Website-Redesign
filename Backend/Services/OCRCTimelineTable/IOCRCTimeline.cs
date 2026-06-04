using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IOCRCTimelineService : ICrudServiceBase<OCRCTimelineResponse, OCRCTimelinePostRequest, OCRCTimelinePatchRequest>
{
}