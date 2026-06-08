using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AchievementsController : ControllerBase
{
    private readonly IAchievementService _achievementService;

    public AchievementsController(IAchievementService achievementService)
    {
        _achievementService = achievementService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AchievementResponse>>> GetAllAchievements()
    {
        var achievements = await _achievementService.GetAllAsync();
        return Ok(achievements);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AchievementResponse>> GetAchievementById(int id)
    {
        var achievement = await _achievementService.GetByIdAsync(id);
        
        return Ok(achievement);
    }

    [HttpPost]
    public async Task<ActionResult<AchievementResponse>> CreateAchievement([FromBody] AchievementPostRequest achievementDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdAchievement = await _achievementService.CreateAsync(achievementDto);
        
        return CreatedAtAction(nameof(GetAchievementById), new { id = createdAchievement.Id }, createdAchievement);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<AchievementResponse>> UpdateAchievement(int id, [FromBody] AchievementPatchRequest achievementDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedAchievement = await _achievementService.UpdateAsync(id, achievementDto);
        
        return Ok(updatedAchievement);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAchievement(int id)
    {
        await _achievementService.DeleteAsync(id);
        
        return NoContent();
    }
}