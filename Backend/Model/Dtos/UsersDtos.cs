using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class UsersResponse
{
    [Required]
    [Key]
    public required string Id { get; set; }
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Role { get; set; }
    public DateTime LastLoginAt { get; set; }
}

public class UsersPostRequest
{
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Password { get; set; }
    [Required]
    public required string Role { get; set; }
}

public class UsersPatchRequest
{
    [Required]
    public required string Id { get; set; }
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Role { get; set; }
}