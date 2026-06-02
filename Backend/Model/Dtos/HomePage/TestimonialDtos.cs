using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos
{
    public class TestimonialResponse
    {
        public int Id { get; set; }
        public int Rate { get; set; }
        [Required]
        public required string AuthorName { get; set; }
        [Required]
        public required string AuthorRole { get; set; }
        [Required]
        public required string Content { get; set; }
        public bool IsApproved { get; set; }
    }

    public class TestimonialPostRequest
    {
        [Required]
        public int Rate { get; set; }
        [Required]
        public required string AuthorName { get; set; }
        [Required]
        public required string AuthorRole { get; set; }
        [Required]
        public required string Content { get; set; }
        public bool IsApproved { get; set; }
    }

    public class TestimonialPatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int Rate { get; set; }
        [Required]
        public required string AuthorName { get; set; }
        [Required]
        public required string AuthorRole { get; set; }
        [Required]
        public required string Content { get; set; }
        public bool IsApproved { get; set; }
    }
}