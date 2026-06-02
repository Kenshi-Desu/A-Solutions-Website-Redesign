using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class OCRCEventDetailsService : IOCRCEventDetailsService
{
    private readonly Supabase.Client _supabaseClient;

    public OCRCEventDetailsService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<OCRCEventDetailsResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<OCRCEventDetails>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("OCRC Event Details not found.");

        return new OCRCEventDetailsResponse
        {
            Id = response.Id,
            EventDate = response.EventDate,
            EventTime = response.EventTime,
            VenueName = response.VenueName,
            Eligibility = response.Eligibility,
            RulesPdfUrl = response.RulesPdfUrl,
        };
    }

    public async Task<OCRCEventDetailsResponse> CreateAsync(OCRCEventDetailsPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var eventDetails = new OCRCEventDetails
        {
            EventDate = request.EventDate,
            EventTime = request.EventTime,
            VenueName = request.VenueName,
            Eligibility = request.Eligibility,
            RulesPdfUrl = request.RulesPdfUrl
        };

        var response = await _supabaseClient.From<OCRCEventDetails>().Insert(eventDetails);
        var createdEventDetails = response.Models.FirstOrDefault();

        if (createdEventDetails == null )
            throw new InvalidOperationException("Failed to create OCRC Event Details.");

        return new OCRCEventDetailsResponse
        {
            Id = createdEventDetails.Id,
            EventDate = createdEventDetails.EventDate,
            EventTime = createdEventDetails.EventTime,
            VenueName = createdEventDetails.VenueName,
            Eligibility = createdEventDetails.Eligibility,
            RulesPdfUrl = createdEventDetails.RulesPdfUrl
        };
    }

    public async Task<OCRCEventDetailsResponse> UpdateAsync(int id, OCRCEventDetailsPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var eventDetails = new OCRCEventDetails
        {
            Id = id,
            EventDate = request.EventDate,
            EventTime = request.EventTime,
            VenueName = request.VenueName,
            Eligibility = request.Eligibility,
            RulesPdfUrl = request.RulesPdfUrl
        };

        var response = await _supabaseClient.From<OCRCEventDetails>().Update(eventDetails);
        var updatedEventDetails = response.Models.FirstOrDefault();

        if (updatedEventDetails == null )
            throw new InvalidOperationException("Failed to update OCRC Event Details.");

        return new OCRCEventDetailsResponse
        {
            Id = updatedEventDetails.Id,
            EventDate = updatedEventDetails.EventDate,
            EventTime = updatedEventDetails.EventTime,
            VenueName = updatedEventDetails.VenueName,
            Eligibility = updatedEventDetails.Eligibility,
            RulesPdfUrl = updatedEventDetails.RulesPdfUrl
        };
    }
}