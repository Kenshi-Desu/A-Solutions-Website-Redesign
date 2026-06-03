using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("mission_vision")]
public class MissionVision : BaseModel
{
    [SetsRequiredMembers]
    public MissionVision()
    {
        MissionStatement = string.Empty;
        VisionStatement = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("mission_statement")]
    public string MissionStatement { get; set; }

    [Column("vision_statement")]
    public string VisionStatement { get; set; }
}