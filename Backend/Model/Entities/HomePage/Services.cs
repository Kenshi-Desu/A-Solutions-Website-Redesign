using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities.HomePage
{
    [Table("services")]
    public class Services
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}