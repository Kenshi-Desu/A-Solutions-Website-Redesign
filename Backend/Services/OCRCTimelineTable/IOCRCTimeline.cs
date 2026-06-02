using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IOCRCTimelineService
{
    Task<IEnumerable<OCRCTimelineResponse>> GetAllAsync();
    Task<OCRCTimelineResponse> GetByIdAsync(int id);
    Task<OCRCTimelineResponse> CreateAsync(OCRCTimelinePostRequest request);
    Task<OCRCTimelineResponse> UpdateAsync(int id, OCRCTimelinePatchRequest request);
    Task<bool> DeleteAsync(int id);
}