using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class MissionVisionService : IMissionVisionService
{
    private readonly Supabase.Client _supabaseClient;

    public MissionVisionService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<MissionVisionResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<MissionVision>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("OCRC Event Details not found.");

        return new MissionVisionResponse
        {
            Id = response.Id,
            MissionStatement = response.MissionStatement,
            VisionStatement = response.VisionStatement,
        };
    }

    public async Task<MissionVisionResponse> CreateAsync(MissionVisionPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var MVDetails = new MissionVision
        {
            MissionStatement = request.MissionStatement,
            VisionStatement = request.VisionStatement,
        };

        var response = await _supabaseClient.From<MissionVision>().Insert(MVDetails);
        var createdMVDetails = response.Models.FirstOrDefault();

        if (createdMVDetails == null )
            throw new InvalidOperationException("Failed to create OCRC Event Details.");

        return new MissionVisionResponse
        {
            Id = createdMVDetails.Id,
            MissionStatement = createdMVDetails.MissionStatement,
            VisionStatement = createdMVDetails.VisionStatement,
        };
    }

    public async Task<MissionVisionResponse> UpdateAsync(int id, MissionVisionPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var MVDetails = new MissionVision
        {
            Id = id,
            MissionStatement = request.MissionStatement,
            VisionStatement = request.VisionStatement,
        };

        var response = await _supabaseClient.From<MissionVision>().Update(MVDetails);
        var updatedMVDetails = response.Models.FirstOrDefault();

        if (updatedMVDetails == null )
            throw new InvalidOperationException("Failed to update OCRC Event Details.");

        return new MissionVisionResponse
        {
            Id = updatedMVDetails.Id,
            MissionStatement = updatedMVDetails.MissionStatement,
            VisionStatement = updatedMVDetails.MissionStatement,
        };
    }
}