using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos.HomePageDtos
{
    public class AchievementsDtos
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

    public class AchievementsPostRequest
    {
        [Required]
        public string Title { get; set; }
        public int AchievementYear { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int AchivementType { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class AchievementsPatchRequest
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