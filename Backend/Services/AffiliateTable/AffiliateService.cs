using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AffiliateService : IAffiliateService
{
    private readonly Supabase.Client _supabaseClient;

    public AffiliateService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<AffiliateResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<Affiliate>().Get();

        return response.Models.Select(a => new AffiliateResponse
        {
            Id = a.Id,
                Name = a.Name,
                LogoImageUrl = a.LogoImageUrl,
                WebsiteUrl = a.WebsiteUrl,
                DisplayOrder = a.DisplayOrder,
                AffiliateType = a.AffiliateType,
                IsActive = a.IsActive,
            })
            .ToList();
    }

    public async Task<AffiliateResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<Affiliate>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single();

        if (response == null) throw new InvalidOperationException("Affiliate not found.");

        return new AffiliateResponse
        {
            Id = response.Id,
            Name = response.Name,
            LogoImageUrl = response.LogoImageUrl,
            WebsiteUrl = response.WebsiteUrl,
            DisplayOrder = response.DisplayOrder,
            AffiliateType = response.AffiliateType,
            IsActive = response.IsActive,
        };
    }

    public async Task<AffiliateResponse> CreateAsync(AffiliatePostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var affiliate = new Affiliate
        {
            Name = request.Name,
            LogoImageUrl = request.LogoImageUrl,
            WebsiteUrl = request.WebsiteUrl,
            DisplayOrder = request.DisplayOrder,
            AffiliateType = request.AffiliateType,
            IsActive = request.IsActive,
        };

        var response = await _supabaseClient.From<Affiliate>().Insert(affiliate);
        var createdAffiliate = response.Model;

        if (createdAffiliate == null) 
            throw new InvalidOperationException("Failed to create affiliate.");

        return new AffiliateResponse
        {
            Id = createdAffiliate.Id,
            Name = createdAffiliate.Name,
            LogoImageUrl = createdAffiliate.LogoImageUrl,
            WebsiteUrl = createdAffiliate.WebsiteUrl,
            DisplayOrder = createdAffiliate.DisplayOrder,
            AffiliateType = createdAffiliate.AffiliateType,
            IsActive = createdAffiliate.IsActive,
        };
    }

    public async Task<AffiliateResponse> UpdateAsync(int id, AffiliatePatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var AffiliateToUpdate = new Affiliate
        {
            Id = id,
            Name = request.Name,
            LogoImageUrl = request.LogoImageUrl,
            WebsiteUrl = request.WebsiteUrl,
            DisplayOrder = request.DisplayOrder,
            AffiliateType = request.AffiliateType,
            IsActive = request.IsActive,
        };
        var response = await _supabaseClient.From<Affiliate>().Update(AffiliateToUpdate);
        var updatedAffiliate = response.Model;

        if (updatedAffiliate == null) 
            throw new InvalidOperationException("Affiliate not found.");

        return new AffiliateResponse
        {
            Id = updatedAffiliate.Id,
            Name = updatedAffiliate.Name,
            LogoImageUrl = updatedAffiliate.LogoImageUrl,
            WebsiteUrl = updatedAffiliate.WebsiteUrl,
            DisplayOrder = updatedAffiliate.DisplayOrder,
            AffiliateType = updatedAffiliate.AffiliateType,
            IsActive = updatedAffiliate.IsActive,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var affiliateToDelete = new Affiliate { Id = id };

        try
        {
            await _supabaseClient.From<Affiliate>().Delete(affiliateToDelete);
            return true;
        }
        catch 
        {
            return false;
        }
    }
}