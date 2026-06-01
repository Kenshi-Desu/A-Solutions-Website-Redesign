using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IAffiliateService
{
    Task<IEnumerable<AffiliateResponse>> GetAllAsync();
    Task<AffiliateResponse> GetByIdAsync(int id);
    Task<AffiliateResponse> CreateAsync(AffiliatePostRequest request);
    Task<AffiliateResponse> UpdateAsync(int id, AffiliatePatchRequest request);
    Task<bool> DeleteAsync(int id);
}
