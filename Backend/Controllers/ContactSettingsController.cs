using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactSettingsController : ControllerBase
{
    private readonly IContactSettingsService _contactSettingsService;

    public ContactSettingsController(IContactSettingsService contactSettingsService)
    {
        _contactSettingsService = contactSettingsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllContactSettings()
    {
        var contactSettingsS = await _contactSettingsService.GetAllAsync();
        return Ok(contactSettingsS);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetContactSettingsById(int id)
    {
        var contactSettingsS = await _contactSettingsService.GetByIdAsync(id);
        if (contactSettingsS == null)
        {
            return NotFound();
        }
        return Ok(contactSettingsS);
    }

    [HttpPost]
    public async Task<IActionResult> CreateContactSettings([FromBody] ContactSettingsPostRequest contactSettingsSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdContactSettings = await _contactSettingsService.CreateAsync(contactSettingsSDto);
        return CreatedAtAction(nameof(GetContactSettingsById), new { id = createdContactSettings.Id }, createdContactSettings);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateContactSettings(int id, [FromBody] ContactSettingsPatchRequest contactSettingsSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedContactSettings = await _contactSettingsService.UpdateAsync(id, contactSettingsSDto);
        if (updatedContactSettings == null)
        {
            return NotFound();
        }
        return Ok(updatedContactSettings);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContactSettings(int id)
    {
        var result = await _contactSettingsService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}