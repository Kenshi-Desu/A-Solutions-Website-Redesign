using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class OCRCTimelineResponse
{
    [Key]
    public int Id { get; set; }
    public int TimelineYear { get; set; }
    [Required]
    public required string EventDescription { get; set; }
    public int DisplayOrder { get; set; }
}

public class OCRCTimelinePostRequest
{
    public int TimelineYear { get; set; }
    [Required]
    public required string EventDescription { get; set; }
    public int DisplayOrder { get; set; }
}

public class OCRCTimelinePatchRequest
{
    public int Id { get; set; }
    public int TimelineYear { get; set; }
    [Required]
    public required string EventDescription { get; set; }
    public int DisplayOrder { get; set; }
}