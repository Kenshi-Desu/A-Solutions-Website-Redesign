using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos
{
    public class ServiceResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class ServicePostRequest
    {
        [Required]
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class ServicePatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}