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
    public async Task<ActionResult<ContactSettingsResponse>> GetContactSettingss()
    {
        var contactSettingss = await _contactSettingsService.GetAsync();
        return Ok(contactSettingss);
    }

    [HttpPatch]
    public async Task<ActionResult<ContactSettingsResponse>> UpdateContactSettings([FromBody] ContactSettingsPatchRequest contactSettingsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedContactSettings = await _contactSettingsService.UpdateAsync(contactSettingsDto);
        
        return Ok(updatedContactSettings);
    }
}