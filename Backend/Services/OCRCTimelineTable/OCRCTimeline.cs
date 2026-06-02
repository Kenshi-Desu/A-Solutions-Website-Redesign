using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCTimelineService : IOCRCTimelineService
{
    private readonly Supabase.Client _supabaseClient;

    public OCRCTimelineService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<OCRCTimelineResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<OCRCTimeline>().Get();

        return response.Models.Select(o => new OCRCTimelineResponse
        {
            Id = o.Id,
            TimelineYear = o.TimelineYear,
            EventDescription = o.EventDescription,
            DisplayOrder = o.DisplayOrder,
        }).ToList();
    }

    public async Task<OCRCTimelineResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<OCRCTimeline>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single();

        if (response == null) throw new InvalidOperationException("Timeline not Found");

        return new OCRCTimelineResponse
        {
            Id = response.Id,
            TimelineYear = response.TimelineYear,
            EventDescription = response.EventDescription,
            DisplayOrder = response.DisplayOrder,
        };
    }

    public async Task<OCRCTimelineResponse> CreateAsync(OCRCTimelinePostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var timeline = new OCRCTimeline
        {
            TimelineYear = request.TimelineYear,
            EventDescription = request.EventDescription,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<OCRCTimeline>().Insert(timeline);
        var createdTimeline = response.Model;

        if (createdTimeline == null)
            throw new InvalidOperationException("Faild to save record to Supabase backend database.");

        return new OCRCTimelineResponse
        {
            Id = createdTimeline.Id,
            TimelineYear = createdTimeline.TimelineYear,
            EventDescription = createdTimeline.EventDescription,
            DisplayOrder = createdTimeline.DisplayOrder,
        };
    }

    public async Task<OCRCTimelineResponse> UpdateAsync(int id, OCRCTimelinePatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var timelineToUpdate = new OCRCTimeline
        {
            Id = id,
            TimelineYear = request.TimelineYear,
            EventDescription = request.EventDescription,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<OCRCTimeline>().Update(timelineToUpdate);
        var updateTimeline = response.Model;

        if (updateTimeline == null)
            throw new InvalidOperationException("Failed to update achievement.");

        return new OCRCTimelineResponse
        {
            Id = updateTimeline.Id,
            TimelineYear = updateTimeline.TimelineYear,
            EventDescription = updateTimeline.EventDescription,
            DisplayOrder = updateTimeline.DisplayOrder,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var timelineToDelete = new OCRCTimeline { Id = id };

        try
        {
            await _supabaseClient.From<OCRCTimeline>().Delete(timelineToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}