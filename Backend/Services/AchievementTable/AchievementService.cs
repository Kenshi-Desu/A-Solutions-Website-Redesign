using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AchievementService : CrudServiceBase<Achievement, AchievementResponse, AchievementPostRequest, AchievementPatchRequest>, IAchievementService
{
    public AchievementService(Supabase.Client supabaseClient, ILogger<AchievementService> logger) : base(supabaseClient, logger)
    {
    }

    protected override Achievement MapToEntity(AchievementPostRequest dto)
    {
        return new Achievement
        {
            Title = dto.Title,
            AchievementYear = dto.AchievementYear,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            AchivementType = dto.AchivementType,
            DisplayOrder = dto.DisplayOrder
        };
    }

    protected override void ApplyPatch(AchievementPatchRequest dto, Achievement entity)
    {
        if (!string.IsNullOrEmpty(dto.Title)) entity.Title = dto.Title;
        if (dto.AchievementYear != 0) entity.AchievementYear = dto.AchievementYear;
        if (!string.IsNullOrEmpty(dto.Description)) entity.Description = dto.Description;
        if (!string.IsNullOrEmpty(dto.ImageUrl)) entity.ImageUrl = dto.ImageUrl;
        
        entity.AchivementType = dto.AchivementType;
        entity.DisplayOrder = dto.DisplayOrder;
    }

    protected override AchievementResponse MapToResponse(Achievement entity)
    {
        return new AchievementResponse
        {
            Id = entity.Id,
            Title = entity.Title,
            AchievementYear = entity.AchievementYear,
            Description = entity.Description,
            ImageUrl = entity.ImageUrl,
            AchivementType = entity.AchivementType,
            DisplayOrder = entity.DisplayOrder
        };
    }
}