using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("ocrc_event_highlights")]
public class OCRCEventHighlights : BaseModel
{
    [SetsRequiredMembers]
    public OCRCEventHighlights()
    {
        Title = string.Empty;
        Description = string.Empty;
        ImageUrl = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("event_year")]
    public int EventYear { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("description")]
    public string Description { get; set; }

    [Column("image_url")]
    public string ImageUrl { get; set; }

    [Column("display_order")]
    public int DisplayOrder { get; set; }
}