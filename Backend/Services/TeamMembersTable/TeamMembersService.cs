using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class TeamMembersService : ITeamMembersService
{
    private readonly Supabase.Client _supabaseClient;

    public TeamMembersService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<TeamMembersResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<TeamMembers>().Get();

        return response.Models.Select(tm => new TeamMembersResponse
        {
            Id = tm.Id,
            FirstName = tm.FirstName,
            LastName = tm.LastName,
            RoleTitle = tm.RoleTitle,
            Bio = tm.Bio,
            ProfileImageUrl = tm.ProfileImageUrl,
            DisplayOrder = tm.DisplayOrder,
            IsActive = tm.IsActive
        }).ToList();
    }

    public async Task<TeamMembersResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<TeamMembers>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("TeamMembers not found.");

        return new TeamMembersResponse
        {
            Id = response.Id,
            FirstName = response.FirstName,
            LastName = response.LastName,
            RoleTitle = response.RoleTitle,
            Bio = response.Bio,
            ProfileImageUrl = response.ProfileImageUrl,
            DisplayOrder = response.DisplayOrder,
            IsActive = response.IsActive,
        };
    }


    public async Task<TeamMembersResponse> CreateAsync(TeamMembersPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var TeamMembers = new TeamMembers
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            RoleTitle =request.RoleTitle,
            Bio = request.Bio,
            ProfileImageUrl = request.ProfileImageUrl,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
        };

        var response = await _supabaseClient.From<TeamMembers>().Insert(TeamMembers);
        var createdTeamMembers = response.Model; 

        if (createdTeamMembers == null)
            throw new InvalidOperationException("Failed to save record to Supabase backend database.");

        return new TeamMembersResponse
        {
            Id = createdTeamMembers.Id,
            FirstName = createdTeamMembers.FirstName,
            LastName = createdTeamMembers.LastName,
            RoleTitle =createdTeamMembers.RoleTitle,
            Bio = createdTeamMembers.Bio,
            ProfileImageUrl = createdTeamMembers.ProfileImageUrl,
            DisplayOrder = createdTeamMembers.DisplayOrder,
            IsActive = createdTeamMembers.IsActive,
        };
    }

    public async Task<TeamMembersResponse> UpdateAsync(int id, TeamMembersPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var TeamMembersToUpdate = new TeamMembers
        {
            Id = id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            RoleTitle =request.RoleTitle,
            Bio = request.Bio,
            ProfileImageUrl = request.ProfileImageUrl,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
        };

        var response = await _supabaseClient.From<TeamMembers>().Update(TeamMembersToUpdate);
        var updatedTeamMembers = response.Model;

        if (updatedTeamMembers == null) 
            throw new InvalidOperationException("Failed to update TeamMembers.");

        return new TeamMembersResponse
        {
            Id = updatedTeamMembers.Id,
            FirstName = updatedTeamMembers.FirstName,
            LastName = updatedTeamMembers.LastName,
            RoleTitle =updatedTeamMembers.RoleTitle,
            Bio = updatedTeamMembers.Bio,
            ProfileImageUrl = updatedTeamMembers.ProfileImageUrl,
            DisplayOrder = updatedTeamMembers.DisplayOrder,
            IsActive = updatedTeamMembers.IsActive,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var TeamMembersToDelete = new TeamMembers { Id = id };
        
        try
        {
            await _supabaseClient.From<TeamMembers>().Delete(TeamMembersToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
