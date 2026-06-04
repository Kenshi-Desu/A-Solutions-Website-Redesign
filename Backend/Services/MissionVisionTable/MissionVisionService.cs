using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class MissionVisionService : SingletonServiceBase<MissionVision, MissionVisionResponse, MissionVisionPatchRequest>, IMissionVisionService
{
    public MissionVisionService(Supabase.Client supabaseClient, ILogger<MissionVisionService> logger) : base(supabaseClient, logger)
    {
    }

    protected override void ApplyPatch(MissionVisionPatchRequest dto, MissionVision entity)
    {
        if (!string.IsNullOrEmpty(dto.MissionStatement)) entity.MissionStatement = dto.MissionStatement;
        if (!string.IsNullOrEmpty(dto.VisionStatement)) entity.VisionStatement = dto.VisionStatement;
    }

    protected override MissionVisionResponse MapToResponse(MissionVision entity)
    {
        return new MissionVisionResponse
        {
            Id = entity.Id,
            MissionStatement = entity.MissionStatement,
            VisionStatement = entity.VisionStatement
        };
    }
}