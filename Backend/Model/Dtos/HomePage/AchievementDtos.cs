using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos
{
    public class AchievementResponse
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int AchievementYear { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int AchivementType { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class AchievementPostRequest
    {
        [Required]
        public string Title { get; set; }
        public int AchievementYear { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int AchivementType { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class AchievementPatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public int AchievementYear { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int AchivementType { get; set; }
        public int DisplayOrder { get; set; }
    }
}