using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("core_values")]
public class CoreValues : BaseModel
{
    [SetsRequiredMembers]
    public CoreValues()
    {
        IconName = string.Empty;
        Title = string.Empty;
        Description = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("icon_name")]
    public string IconName { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("description")]
    public string Description { get; set; }

    [Column("display_order")]
    public int DisplayOrder { get; set; }
}