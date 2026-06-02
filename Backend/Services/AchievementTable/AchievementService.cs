using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AchievementService : IAchievementService
{
    private readonly Supabase.Client _supabaseClient;

    public AchievementService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<AchievementResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<Achievement>().Get();

        return response.Models.Select(a => new AchievementResponse
        {
            Id = a.Id,
            Title = a.Title,
            AchievementYear = a.AchievementYear,
            Description = a.Description,
            ImageUrl = a.ImageUrl,
            AchivementType = a.AchivementType,
            DisplayOrder = a.DisplayOrder,
        }).ToList();
    }

    public async Task<AchievementResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<Achievement>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single(); 

        if (response == null) throw new InvalidOperationException("Achievement not found.");

        return new AchievementResponse
        {
            Id = response.Id,
            Title = response.Title,
            AchievementYear = response.AchievementYear,
            Description = response.Description,
            ImageUrl = response.ImageUrl,
            AchivementType = response.AchivementType,
            DisplayOrder = response.DisplayOrder,
        };
    }


    public async Task<AchievementResponse> CreateAsync(AchievementPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var achievement = new Achievement
        {
            Title = request.Title,
            AchievementYear = request.AchievementYear,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            AchivementType = request.AchivementType,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<Achievement>().Insert(achievement);
        var createdAchievement = response.Model; 

        if (createdAchievement == null)
            throw new InvalidOperationException("Failed to save record to Supabase backend database.");

        return new AchievementResponse
        {
            Id = createdAchievement.Id,
            Title = createdAchievement.Title,
            AchievementYear = createdAchievement.AchievementYear,
            Description = createdAchievement.Description,
            ImageUrl = createdAchievement.ImageUrl,
            AchivementType = createdAchievement.AchivementType,
            DisplayOrder = createdAchievement.DisplayOrder,
        };
    }

    public async Task<AchievementResponse> UpdateAsync(int id, AchievementPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var achievementToUpdate = new Achievement
        {
            Id = id,
            Title = request.Title,
            AchievementYear = request.AchievementYear,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            AchivementType = request.AchivementType,
            DisplayOrder = request.DisplayOrder,
        };

        var response = await _supabaseClient.From<Achievement>().Update(achievementToUpdate);
        var updatedAchievement = response.Model;

        if (updatedAchievement == null) 
            throw new InvalidOperationException("Failed to update achievement.");

        return new AchievementResponse
        {
            Id = updatedAchievement.Id,
            Title = updatedAchievement.Title,
            AchievementYear = updatedAchievement.AchievementYear,
            Description = updatedAchievement.Description,
            ImageUrl = updatedAchievement.ImageUrl,
            AchivementType = updatedAchievement.AchivementType,
            DisplayOrder = updatedAchievement.DisplayOrder,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var achievementToDelete = new Achievement { Id = id };
        
        try
        {
            await _supabaseClient.From<Achievement>().Delete(achievementToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
