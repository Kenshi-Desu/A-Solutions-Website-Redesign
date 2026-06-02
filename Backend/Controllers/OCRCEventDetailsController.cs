using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OCRCEventDetailsController : ControllerBase
{
    private readonly IOCRCEventDetailsService _eventDetailsService;

    public OCRCEventDetailsController(IOCRCEventDetailsService eventDetailsService)
    {
        _eventDetailsService = eventDetailsService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOCRCEventDetailsById(int id)
    {
        var eventDetails = await _eventDetailsService.GetByIdAsync(id);
        if (eventDetails == null)
        {
            return NotFound();
        }
        return Ok(eventDetails);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOCRCEventDetails([FromBody] OCRCEventDetailsPostRequest eventDetailsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var createdEventDetails = await _eventDetailsService.CreateAsync(eventDetailsDto);
        return CreatedAtAction(nameof(GetOCRCEventDetailsById), new {id = createdEventDetails.Id}, createdEventDetails);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOCRCEventDetails(int id, [FromBody] OCRCEventDetailsPatchRequest eventDetailsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updateEventDetails = await _eventDetailsService.UpdateAsync(id, eventDetailsDto);
        if (updateEventDetails == null)
        {
            return NotFound();
        }
        return Ok(updateEventDetails);
    }
}