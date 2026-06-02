using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("services")]
    public class Service : BaseModel
    {
        [SetsRequiredMembers]
        public Service()
        {
            Title = string.Empty;
            ShortDescription = string.Empty;
            IconName = string.Empty;
        }

        [PrimaryKey("id", false)]
        public int Id { get; set; }
        [Column("title")]
        public string Title { get; set; }
        [Column("short_description")]
        public string ShortDescription { get; set; }
        [Column("icon_name")]
        public string IconName { get; set; }
        [Column("display_order")]
        public int DisplayOrder { get; set; }
        [Column("is_active")]
        public bool IsActive { get; set; }
    }
}