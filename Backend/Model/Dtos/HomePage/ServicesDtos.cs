using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos.HomePageDtos
{
    public class ServicesResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public int IsActive { get; set; }
    }

    public class ServicesPostRequest
    {
        [Required]
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public int IsActive { get; set; }
    }

    public class ServicesPatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string IconName { get; set; }
        public int DisplayOrder { get; set; }
        public int IsActive { get; set; }
    }
}