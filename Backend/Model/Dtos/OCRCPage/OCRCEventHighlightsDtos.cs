using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class OCRCEventHighlightsResponse
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Title { get; set; }
    public int EventYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
}

public class OCRCEventHighlightsPostRequest
{
    [Required]
    public required string Title { get; set; }
    public int EventYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
}

public class OCRCEventHighlightsPatchRequest
{
    [Required]
    public int Id { get; set; }
    [Required]
    public required string Title { get; set; }
    public int EventYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
}