using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("services")]
    public class Service
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