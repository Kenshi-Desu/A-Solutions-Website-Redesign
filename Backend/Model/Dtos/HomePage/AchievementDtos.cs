using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos;

public class AchievementResponse
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Title { get; set; }
    public int AchievementYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int AchivementType { get; set; }
    public int DisplayOrder { get; set; }
}

public class AchievementPostRequest
{
    [Required]
    public required string Title { get; set; }
    public int AchievementYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int AchivementType { get; set; }
    public int DisplayOrder { get; set; }
}

public class AchievementPatchRequest
{
    [Required]
    public int Id { get; set; }
    [Required]
    public required string Title { get; set; }
    public int AchievementYear { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string ImageUrl { get; set; }
    public int AchivementType { get; set; }
    public int DisplayOrder { get; set; }
}
