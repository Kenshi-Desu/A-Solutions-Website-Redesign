using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("testimonials")]
public class Testimonial : BaseModel
{
    [SetsRequiredMembers]
    public Testimonial()
    {
        AuthorName = string.Empty;
        AuthorRole = string.Empty;
        Content = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }
    [Column("rate")]
    public int Rate { get; set; }
    [Column("author_name")]
    public string AuthorName { get; set; }
    [Column("author_role")]
    public string AuthorRole { get; set; }
    [Column("content")]
    public string Content { get; set; }
    [Column("is_approved")]
    public bool IsApproved { get; set; }
}