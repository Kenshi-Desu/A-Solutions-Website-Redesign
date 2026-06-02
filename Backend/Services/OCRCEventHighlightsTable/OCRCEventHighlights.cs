using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCEventHighlightsService : IOCRCEventHighlightsService
{
    private readonly Supabase.Client _supabaseClient;

    public OCRCEventHighlightsService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<OCRCEventHighlightsResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<OCRCEventHighlights>().Get();

        return response.Models.Select(e => new OCRCEventHighlightsResponse
        {
            Id = e.Id,
            Title = e.Title,
            EventYear = e.EventYear,
            Description = e.Description,
            ImageUrl = e.ImageUrl,
            DisplayOrder = e.DisplayOrder,
        }).ToList();
    }

    public async Task<OCRCEventHighlightsResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<OCRCEventHighlights>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single();

        if (response == null) throw new InvalidOperationException("Event highlight not found.");

        return new OCRCEventHighlightsResponse
        {
            Id = response.Id,
            Title = response.Title,
            EventYear = response.EventYear,
            Description = response.Description,
            ImageUrl = response.ImageUrl,
            DisplayOrder = response.DisplayOrder,
        };
    }

    public async Task<OCRCEventHighlightsResponse> CreateAsync(OCRCEventHighlightsPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var entity = new OCRCEventHighlights
        {
            Title = request.Title,
            EventYear = request.EventYear,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<OCRCEventHighlights>().Insert(entity);
        var createdHighlight = response.Model;

        if (createdHighlight == null) 
            throw new InvalidOperationException("Failed to create event highlight.");

        return new OCRCEventHighlightsResponse
        {
            Id = createdHighlight.Id,
            Title = createdHighlight.Title,
            EventYear = createdHighlight.EventYear,
            Description = createdHighlight.Description,
            ImageUrl = createdHighlight.ImageUrl,
            DisplayOrder = createdHighlight.DisplayOrder,
        };
    }

    public async Task<OCRCEventHighlightsResponse> UpdateAsync(int id, OCRCEventHighlightsPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var entity = new OCRCEventHighlights
        {
            Id = request.Id,
            Title = request.Title,
            EventYear = request.EventYear,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<OCRCEventHighlights>().Update(entity);
        var updatedHighlight = response.Model;

        if (updatedHighlight == null)
            throw new InvalidOperationException("Failed to update event highlight.");

        return new OCRCEventHighlightsResponse
        {
            Id = updatedHighlight.Id,
            Title = updatedHighlight.Title,
            EventYear = updatedHighlight.EventYear,
            Description = updatedHighlight.Description,
            ImageUrl = updatedHighlight.ImageUrl,
            DisplayOrder = updatedHighlight.DisplayOrder,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var highlightToDelete = new OCRCEventHighlights { Id = id };

        try
        {
            await _supabaseClient.From<OCRCEventHighlights>().Delete(highlightToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}