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

    [HttpGet]
    public async Task<ActionResult<OCRCEventDetailsResponse>> GetOCRCEventDetailss()
    {
        var eventDetailss = await _eventDetailsService.GetAsync();
        return Ok(eventDetailss);
    }

    [HttpPatch]
    public async Task<ActionResult<OCRCEventDetailsResponse>> UpdateOCRCEventDetails([FromBody] OCRCEventDetailsPatchRequest eventDetailsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedOCRCEventDetails = await _eventDetailsService.UpdateAsync(eventDetailsDto);
        
        return Ok(updatedOCRCEventDetails);
    }
}