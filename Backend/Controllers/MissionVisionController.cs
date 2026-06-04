using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MissionVisionController : ControllerBase
{
    private readonly IMissionVisionService _missionVissionService;

    public MissionVisionController(IMissionVisionService missionVissionService)
    {
        _missionVissionService = missionVissionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMissionVisions()
    {
        var missionVissions = await _missionVissionService.GetAsync();
        return Ok(missionVissions);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateMissionVision([FromBody] MissionVisionPatchRequest missionVissionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedMissionVision = await _missionVissionService.UpdateAsync(missionVissionDto);
        
        return Ok(updatedMissionVision);
    }
}