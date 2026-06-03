using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamMembersController : ControllerBase
{
    private readonly ITeamMembersService _teamMembersService;

    public TeamMembersController(ITeamMembersService teamMembersService)
    {
        _teamMembersService = teamMembersService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTeamMembers()
    {
        var teamMembersS = await _teamMembersService.GetAllAsync();
        return Ok(teamMembersS);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTeamMembersById(int id)
    {
        var teamMembersS = await _teamMembersService.GetByIdAsync(id);
        if (teamMembersS == null)
        {
            return NotFound();
        }
        return Ok(teamMembersS);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeamMembers([FromBody] TeamMembersPostRequest teamMembersSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdTeamMembers = await _teamMembersService.CreateAsync(teamMembersSDto);
        return CreatedAtAction(nameof(GetTeamMembersById), new { id = createdTeamMembers.Id }, createdTeamMembers);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateTeamMembers(int id, [FromBody] TeamMembersPatchRequest teamMembersSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedTeamMembers = await _teamMembersService.UpdateAsync(id, teamMembersSDto);
        if (updatedTeamMembers == null)
        {
            return NotFound();
        }
        return Ok(updatedTeamMembers);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeamMembers(int id)
    {
        var result = await _teamMembersService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}