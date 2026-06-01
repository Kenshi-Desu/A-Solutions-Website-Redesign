using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos.HomePageDtos
{
    public class AffiliatesResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoImageUrl { get; set; }
        public string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class AffiliatesPostRequest
    {
        [Required]
        public string Name { get; set; }
        public string LogoImageUrl { get; set; }
        public string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class AffiliatesPatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string LogoImageUrl { get; set; }
        public string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}