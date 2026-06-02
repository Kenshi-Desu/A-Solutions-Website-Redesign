using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("affiliates")]
public class Affiliate : BaseModel
{
    [SetsRequiredMembers]
    public Affiliate()
    {
        Name = string.Empty;
        LogoImageUrl = string.Empty;
        WebsiteUrl = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }
    [Column("name")]
    public string Name { get; set; }
    [Column("logo_image_url")]
    public string LogoImageUrl { get; set; }
    [Column("website_url")]
    public string WebsiteUrl { get; set; }
    [Column("affiliate_type")]
    public int AffiliateType { get; set; }
    [Column("display_order")]
    public int DisplayOrder { get; set; }
    [Column("is_active")]
    public bool IsActive { get; set; }
}