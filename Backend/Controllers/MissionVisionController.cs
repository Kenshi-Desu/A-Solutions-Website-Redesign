using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MissionVisionController : ControllerBase
{
    private readonly IMissionVisionService _missionVisionService;

    public MissionVisionController(IMissionVisionService missionVisionService)
    {
        _missionVisionService = missionVisionService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMissionVisionById(int id)
    {
        var missionVision = await _missionVisionService.GetByIdAsync(id);
        if (missionVision == null)
        {
            return NotFound();
        }
        return Ok(missionVision);
    }

    [HttpPost]
    public async Task<IActionResult> CreateMissionVision([FromBody] MissionVisionPostRequest missionVisionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var createdMissionVision = await _missionVisionService.CreateAsync(missionVisionDto);
        return CreatedAtAction(nameof(GetMissionVisionById), new {id = createdMissionVision.Id}, createdMissionVision);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateMissionVision(int id, [FromBody] MissionVisionPatchRequest missionVisionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updateMissionVision = await _missionVisionService.UpdateAsync(id, missionVisionDto);
        if (updateMissionVision == null)
        {
            return NotFound();
        }
        return Ok(updateMissionVision);
    }
}