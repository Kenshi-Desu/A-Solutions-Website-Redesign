using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class CoreValuesResponse
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Description { get; set; }

    public int DisplayOrder { get; set; }
}

public class CoreValuesRequest
{
    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Description { get; set; }

    public int DisplayOrder { get; set; }
}

public class CoreValuesPostRequest
{
    [Required]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Description { get; set; }

    public int DisplayOrder { get; set; }
}