using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("users")]
public class Users : BaseModel
{
    [SetsRequiredMembers]
        public Users()
    {
        Id = string.Empty;
        Username = string.Empty;
        Email = string.Empty;
        Role = string.Empty;
    }

    [PrimaryKey("id", true)]
    public string Id { get; set; }

    [Column("username")]
    public string Username { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("role")]
    public string Role { get; set; }

    [Column("last_login_at")]
    public DateTime LastLoginAt { get; set; }
}