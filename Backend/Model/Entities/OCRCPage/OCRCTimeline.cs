using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("ocrc_timeline")]
    public class OCRCTimeline : BaseModel
    {
        [SetsRequiredMembers]
        public OCRCTimeline()
        {
            EventDescription = string.Empty;
        }

        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("timeline_year")]
        public int TimelineYear { get; set; }

        [Column("event_description")]
        public string EventDescription { get; set; }

        [Column("display_order")]
        public int DisplayOrder { get; set; }
    }
}