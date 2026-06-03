using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IMissionVisionService
{
    Task<MissionVisionResponse> GetByIdAsync(int id);
    Task<MissionVisionResponse> CreateAsync(MissionVisionPostRequest request);
    Task<MissionVisionResponse> UpdateAsync(int id, MissionVisionPatchRequest request);
}