using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("achievements")]
    public class Achievement
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
}