using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IOCRCEventHighlightsService
{
    Task<IEnumerable<OCRCEventHighlightsResponse>> GetAllAsync();
    Task<OCRCEventHighlightsResponse> GetByIdAsync(int id);
    Task<OCRCEventHighlightsResponse> CreateAsync(OCRCEventHighlightsPostRequest request);
    Task<OCRCEventHighlightsResponse> UpdateAsync(int id, OCRCEventHighlightsPatchRequest request);
    Task<bool> DeleteAsync(int id);
}