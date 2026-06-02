using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class OCRCEventDetailsResponse
{
    [Key]
    public int Id { get; set; }
    public int EventDate { get; set; }
    [Required]
    public required string EventTime { get; set; }
    [Required]
    public required string VenueName { get; set; }
    [Required]
    public required string Eligibility { get; set; }
    [Required]
    public required string RulesPdfUrl { get; set; }
}

public class OCRCEventDetailsPostRequest
{
    public int EventDate { get; set; }
    [Required]
    public required string EventTime { get; set; }
    [Required]
    public required string VenueName { get; set; }
    [Required]
    public required string Eligibility { get; set; }
    [Required]
    public required string RulesPdfUrl { get; set; }
}

public class OCRCEventDetailsPatchRequest
{
    public int EventDate { get; set; }
    [Required]
    public required string EventTime { get; set; }
    [Required]
    public required string VenueName { get; set; }
    [Required]
    public required string Eligibility { get; set; }
    [Required]
    public required string RulesPdfUrl { get; set; }
}