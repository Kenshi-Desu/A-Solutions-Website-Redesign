using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos
{
    public class ServiceResponse
    {
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string ShortDescription { get; set; }
        [Required]
        public required string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class ServicePostRequest
    {
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string ShortDescription { get; set; }
        [Required]
        public required string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class ServicePatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string ShortDescription { get; set; }
        [Required]
        public required string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}