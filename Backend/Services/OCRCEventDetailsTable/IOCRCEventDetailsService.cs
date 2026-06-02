using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IOCRCEventDetailsService
{
    Task<OCRCEventDetailsResponse> GetByIdAsync(int id);
    Task<OCRCEventDetailsResponse> CreateAsync(OCRCEventDetailsPostRequest request);
    Task<OCRCEventDetailsResponse> UpdateAsync(int id, OCRCEventDetailsPatchRequest request);
}