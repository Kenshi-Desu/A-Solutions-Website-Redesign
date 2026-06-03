using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("team_members")]
public class TeamMembers : BaseModel
{
    [SetsRequiredMembers]
    public TeamMembers()
    {
        FirstName = string.Empty;
        LastName = string.Empty;
        RoleTitle = string.Empty;
        Bio = string.Empty;
        ProfileImageUrl = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("first_name")]
    public string FirstName { get; set; }

    [Column("last_name")]
    public string LastName { get; set; }

    [Column("role_title")]
    public string RoleTitle { get; set; }

    [Column("bio")]
    public string Bio { get; set; }

    [Column("profile_image_url")]
    public string ProfileImageUrl { get; set; }

    [Column("display_order")]
    public int DisplayOrder { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; }
}