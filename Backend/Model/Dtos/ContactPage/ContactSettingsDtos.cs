using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class ContactSettingsResponse
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string ContactPhone { get; set; }
    [Required]
    public required string ContactEmail { get; set; }
    [Required]
    public required string PhysicalAddress { get; set; }
    [Required]
    public required string BusinessHours { get; set; }
}

public class ContactSettingsPostRequest
{
    [Required]
    public required string ContactPhone { get; set; }
    [Required]
    public required string ContactEmail { get; set; }
    [Required]
    public required string PhysicalAddress { get; set; }
    [Required]
    public required string BusinessHours { get; set; }
}

public class ContactSettingsPatchRequest
{
    [Required]
    public int Id { get; set; }
    [Required]
    public required string ContactPhone { get; set; }
    [Required]
    public required string ContactEmail { get; set; }
    [Required]
    public required string PhysicalAddress { get; set; }
    [Required]
    public required string BusinessHours { get; set; }
}