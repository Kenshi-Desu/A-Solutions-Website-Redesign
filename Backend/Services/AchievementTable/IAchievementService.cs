using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IAchievementService
{
    Task<IEnumerable<AchievementResponse>> GetAllAsync();
    Task<AchievementResponse> GetByIdAsync(int id);
    Task<AchievementResponse> CreateAsync(AchievementPostRequest request);
    Task<AchievementResponse> UpdateAsync(int id, AchievementPatchRequest request);
    Task<bool> DeleteAsync(int id);
}
