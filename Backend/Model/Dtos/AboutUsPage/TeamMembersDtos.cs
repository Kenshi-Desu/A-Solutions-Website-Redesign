using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class TeamMembersResponse
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    public required string RoleTitle { get; set; }
    [Required]
    public required string Bio { get; set; }
    [Required]
    public required string ProfileImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}

public class TeamMembersPostRequest
{
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    public required string RoleTitle { get; set; }
    [Required]
    public required string Bio { get; set; }
    [Required]
    public required string ProfileImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }    
}

public class TeamMembersPatchRequest
{
    [Required]
    public int Id { get; set; }
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    public required string RoleTitle { get; set; }
    [Required]
    public required string Bio { get; set; }
    [Required]
    public required string ProfileImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }

}