using Microsoft.EntityFrameworkCore;
using A_Solutions_Website_Redesign.Backend.Data;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AffiliateService : IAffiliateService
{
    private readonly AppDbContext _context;

    public AffiliateService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AffiliateResponse>> GetAllAsync()
    {
        return await _context.Affiliates
            .Select(a => new AffiliateResponse
            {
                Id = a.Id,
                Name = a.Name,
                LogoImageUrl = a.LogoImageUrl,
                WebsiteUrl = a.WebsiteUrl,
                DisplayOrder = a.DisplayOrder,
                AffiliateType = a.AffiliateType,
                IsActive = a.IsActive,
            })
            .ToListAsync();
    }

    public async Task<AffiliateResponse> GetByIdAsync(int id)
    {
        var affiliate = await _context.Affiliates.FindAsync(id);
        if (affiliate == null) return null;

        return new AffiliateResponse
        {
            Id = affiliate.Id,
            Name = affiliate.Name,
            LogoImageUrl = affiliate.LogoImageUrl,
            WebsiteUrl = affiliate.WebsiteUrl,
            DisplayOrder = affiliate.DisplayOrder,
            AffiliateType = affiliate.AffiliateType,
            IsActive = affiliate.IsActive,
        };
    }

    public async Task<AffiliateResponse> CreateAsync(AffiliatePostRequest request)
    {
        var affiliate = new Affiliate
        {
            Name = request.Name,
            LogoImageUrl = request.LogoImageUrl,
            WebsiteUrl = request.WebsiteUrl,
            DisplayOrder = request.DisplayOrder,
            AffiliateType = request.AffiliateType,
            IsActive = request.IsActive,
        };

        _context.Affiliates.Add(affiliate);
        await _context.SaveChangesAsync();

        return new AffiliateResponse
        {
            Id = affiliate.Id,
            Name = affiliate.Name,
            LogoImageUrl = affiliate.LogoImageUrl,
            WebsiteUrl = affiliate.WebsiteUrl,
            DisplayOrder = affiliate.DisplayOrder,
            AffiliateType = affiliate.AffiliateType,
            IsActive = affiliate.IsActive,
        };
    }

    public async Task<AffiliateResponse> UpdateAsync(int id, AffiliatePatchRequest request)
    {
        var affiliate = await _context.Affiliates.FindAsync(id);
        if (affiliate == null) return null;

        affiliate.Name = request.Name;
        affiliate.LogoImageUrl = request.LogoImageUrl;
        affiliate.WebsiteUrl = request.WebsiteUrl;
        affiliate.DisplayOrder = request.DisplayOrder;
        affiliate.AffiliateType = request.AffiliateType;
        affiliate.IsActive = request.IsActive;

        await _context.SaveChangesAsync();

        return new AffiliateResponse
        {
            Id = affiliate.Id,
            Name = affiliate.Name,
            LogoImageUrl = affiliate.LogoImageUrl,
            WebsiteUrl = affiliate.WebsiteUrl,
            DisplayOrder = affiliate.DisplayOrder,
            AffiliateType = affiliate.AffiliateType,
            IsActive = affiliate.IsActive,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var affiliate = await _context.Affiliates.FindAsync(id);
        if (affiliate == null) return false;

        _context.Affiliates.Remove(affiliate);
        await _context.SaveChangesAsync();
        return true;
    }
}