using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities
{
    [Table("testimonials")]
    public class Testimonial
    {
        [Key]
        public int Id { get; set; }
        public int Rate { get; set; }
        public string AuthorName { get; set; }
        public string AuthorRole { get; set; }
        public string Content { get; set; }
        public bool IsApproved { get; set; }
    }
}

