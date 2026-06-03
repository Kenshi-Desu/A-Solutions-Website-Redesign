using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface ITeamMembersService
{
    Task<IEnumerable<TeamMembersResponse>> GetAllAsync();
    Task<TeamMembersResponse> GetByIdAsync(int id);
    Task<TeamMembersResponse> CreateAsync(TeamMembersPostRequest request);
    Task<TeamMembersResponse> UpdateAsync(int id, TeamMembersPatchRequest request);
    Task<bool> DeleteAsync(int id);
}