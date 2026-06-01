using Microsoft.EntityFrameworkCore;
using A_Solutions_Website_Redesign.Backend.Data;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AchievementService : IAchievementService
{
    private readonly AppDbContext _context;

    public AchievementService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AchievementResponse>> GetAllAsync()
    {
        return await _context.Achievements
            .Select(a => new AchievementResponse
            {
                Id = a.Id,
                Title = a.Title,
                AchievementYear = a.AchievementYear,
                Description = a.Description,
                ImageUrl = a.ImageUrl,
                AchivementType = a.AchivementType,
                DisplayOrder = a.DisplayOrder,
            })
            .ToListAsync();
    }

    public async Task<AchievementResponse> GetByIdAsync(int id)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null) return null;

        return new AchievementResponse
        {
            Id = achievement.Id,
            Title = achievement.Title,
            AchievementYear = achievement.AchievementYear,
            Description = achievement.Description,
            ImageUrl = achievement.ImageUrl,
            AchivementType = achievement.AchivementType,
            DisplayOrder = achievement.DisplayOrder,
        };
    }

    public async Task<AchievementResponse> CreateAsync(AchievementPostRequest request)
    {
        var achievement = new Achievement
        {
            Title = request.Title,
            AchievementYear = request.AchievementYear,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            AchivementType = request.AchivementType,
            DisplayOrder = request.DisplayOrder,
        };

        _context.Achievements.Add(achievement);
        await _context.SaveChangesAsync();

        return new AchievementResponse
        {
            Id = achievement.Id,
            Title = achievement.Title,
            AchievementYear = achievement.AchievementYear,
            Description = achievement.Description,
            ImageUrl = achievement.ImageUrl,
            AchivementType = achievement.AchivementType,
            DisplayOrder = achievement.DisplayOrder,
        };
    }

    public async Task<AchievementResponse> UpdateAsync(int id, AchievementPatchRequest request)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null) return null;

        achievement.Title = request.Title;
        achievement.AchievementYear = request.AchievementYear;
        achievement.Description = request.Description;
        achievement.ImageUrl = request.ImageUrl;
        achievement.AchivementType = request.AchivementType;
        achievement.DisplayOrder = request.DisplayOrder;

        await _context.SaveChangesAsync();

        return new AchievementResponse
        {
            Id = achievement.Id,
            Title = achievement.Title,
            AchievementYear = achievement.AchievementYear,
            Description = achievement.Description,
            ImageUrl = achievement.ImageUrl,
            AchivementType = achievement.AchivementType,
            DisplayOrder = achievement.DisplayOrder,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null) return false;

        _context.Achievements.Remove(achievement);
        await _context.SaveChangesAsync();
        return true;
    }
}