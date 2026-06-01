using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("affiliates")]
    public class Affiliate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoImageUrl { get; set; }
        public string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}