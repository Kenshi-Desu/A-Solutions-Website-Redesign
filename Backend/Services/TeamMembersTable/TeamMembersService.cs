using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class TeamMembersService : CrudServiceBase<TeamMembers, TeamMembersResponse, TeamMembersPostRequest, TeamMembersPatchRequest>, ITeamMembersService
{
    public TeamMembersService(Supabase.Client supabaseClient, ILogger<TeamMembersService> logger) : base(supabaseClient, logger)
    {
    }

    protected override TeamMembers MapToEntity(TeamMembersPostRequest dto)
    {
        return new TeamMembers
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            RoleTitle = dto.RoleTitle,
            Bio = dto.Bio,
            ProfileImageUrl = dto.ProfileImageUrl,
            DisplayOrder = dto.DisplayOrder,
            IsActive = dto.IsActive
        };
    }

    protected override void ApplyPatch(TeamMembersPatchRequest dto, TeamMembers entity)
    {
        if (!string.IsNullOrEmpty(dto.FirstName)) entity.FirstName = dto.FirstName;
        if (!string.IsNullOrEmpty(dto.LastName)) entity.LastName = dto.LastName;
        if (!string.IsNullOrEmpty(dto.RoleTitle)) entity.RoleTitle = dto.RoleTitle;
        if (!string.IsNullOrEmpty(dto.Bio)) entity.Bio = dto.Bio;
        if (!string.IsNullOrEmpty(dto.ProfileImageUrl)) entity.ProfileImageUrl = dto.ProfileImageUrl;
        entity.DisplayOrder = dto.DisplayOrder;
        entity.IsActive = dto.IsActive;
    }

    protected override TeamMembersResponse MapToResponse(TeamMembers entity)
    {
        return new TeamMembersResponse
        {
            Id = entity.Id,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            RoleTitle = entity.RoleTitle,
            Bio = entity.Bio,
            ProfileImageUrl = entity.ProfileImageUrl,
            DisplayOrder = entity.DisplayOrder,
            IsActive = entity.IsActive
        };
    }
}