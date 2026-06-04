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
    public async Task<IActionResult> GetAllTeamMemberss()
    {
        var teamMemberss = await _teamMembersService.GetAllAsync();
        return Ok(teamMemberss);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTeamMembersById(int id)
    {
        var teamMembers = await _teamMembersService.GetByIdAsync(id);
        
        return Ok(teamMembers);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeamMembers([FromBody] TeamMembersPostRequest teamMembersDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdTeamMembers = await _teamMembersService.CreateAsync(teamMembersDto);
        
        return CreatedAtAction(nameof(GetTeamMembersById), new { id = createdTeamMembers.Id }, createdTeamMembers);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateTeamMembers(int id, [FromBody] TeamMembersPatchRequest teamMembersDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedTeamMembers = await _teamMembersService.UpdateAsync(id, teamMembersDto);
        
        return Ok(updatedTeamMembers);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeamMembers(int id)
    {
        await _teamMembersService.DeleteAsync(id);
        
        return NoContent();
    }
}