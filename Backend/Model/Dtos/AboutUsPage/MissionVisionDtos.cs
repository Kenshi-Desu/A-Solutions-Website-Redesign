using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class MissionVisionResponse
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string MissionStatement { get; set; }
    [Required]
    public required string VisionStatement { get; set; }
}

public class MissionVisionPostRequest
{
    [Required]
    public required string MissionStatement { get; set; }
    [Required]
    public required string VisionStatement { get; set; }    
}

public class MissionVisionPatchRequest
{
    [Required]
    public int Id { get; set; }
    [Required]
    public required string MissionStatement { get; set; }
    [Required]
    public required string VisionStatement { get; set; }    
}