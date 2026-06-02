using System.ComponentModel.DataAnnotations;

namespace A_Solutions_Website_Redesign.Backend.Model.Dtos
{
    public class AffiliateResponse
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string LogoImageUrl { get; set; }
        [Required]
        public required string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class AffiliatePostRequest
    {
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string LogoImageUrl { get; set; }
        [Required]
        public required string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class AffiliatePatchRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string LogoImageUrl { get; set; }
        [Required]
        public required string WebsiteUrl { get; set; }
        public int AffiliateType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}