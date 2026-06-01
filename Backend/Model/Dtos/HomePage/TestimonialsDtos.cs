using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos.HomePageDtos
{
    public class TestimonialsResponse
    {
        public int Id { get; set; }
        public string AuthorName { get; set; }
        public string AuthorRole { get; set; }
        public string Content { get; set; }
        public bool IsApproved { get; set; }
    }

    public class TestimonialsPostRequest
    {
        [Required]
        public string AuthorName { get; set; }
        public string AuthorRole { get; set; }
        public string Content { get; set; }
        public bool IsApproved { get; set; }
    }

    public class TestimonialsPatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string AuthorName { get; set; }
        public string AuthorRole { get; set; }
        public string Content { get; set; }
        public bool IsApproved { get; set; }
    }
}