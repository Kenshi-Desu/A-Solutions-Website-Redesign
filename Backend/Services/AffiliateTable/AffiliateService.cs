using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AffiliateService : CrudServiceBase<Affiliate, AffiliateResponse, AffiliatePostRequest, AffiliatePatchRequest>, IAffiliateService
{
    public AffiliateService(Supabase.Client supabaseClient, ILogger<AffiliateService> logger) : base(supabaseClient, logger)
    {
    }

    protected override Affiliate MapToEntity(AffiliatePostRequest dto)
    {
        return new Affiliate
        {
            Name = dto.Name,
            LogoImageUrl = dto.LogoImageUrl,
            WebsiteUrl = dto.WebsiteUrl,
            AffiliateType = dto.AffiliateType,
            DisplayOrder = dto.DisplayOrder,
            IsActive = dto.IsActive
        };
    }

    protected override void ApplyPatch(AffiliatePatchRequest dto, Affiliate entity)
    {
        if (!string.IsNullOrEmpty(dto.Name)) entity.Name = dto.Name;
        if (!string.IsNullOrEmpty(dto.LogoImageUrl)) entity.LogoImageUrl = dto.LogoImageUrl;
        if (!string.IsNullOrEmpty(dto.WebsiteUrl)) entity.WebsiteUrl = dto.WebsiteUrl;
        entity.AffiliateType = dto.AffiliateType;
        entity.DisplayOrder = dto.DisplayOrder;
        entity.IsActive = dto.IsActive;
    }

    protected override AffiliateResponse MapToResponse(Affiliate entity)
    {
        return new AffiliateResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            LogoImageUrl = entity.LogoImageUrl,
            WebsiteUrl = entity.WebsiteUrl,
            AffiliateType = entity.AffiliateType,
            DisplayOrder = entity.DisplayOrder,
            IsActive = entity.IsActive
        };
    }
}