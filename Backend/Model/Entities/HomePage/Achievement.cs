using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("achievements")]
    public class Achievement : BaseModel
    {
        [SetsRequiredMembers]
        public Achievement()
        {
            Title = string.Empty;
            Description = string.Empty;
            ImageUrl = string.Empty;
        }

        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("achievement_year")]
        public int AchievementYear { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("image_url")]
        public string ImageUrl { get; set; }

        [Column("achievement_type")] 
        public int AchivementType { get; set; }

        [Column("display_order")]
        public int DisplayOrder { get; set; }
    }
}
