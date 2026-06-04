using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OCRCEventHighlightsController : ControllerBase
{
    private readonly IOCRCEventHighlightsService _eventHighlightsService;

    public OCRCEventHighlightsController(IOCRCEventHighlightsService eventHighlightsService)
    {
        _eventHighlightsService = eventHighlightsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOCRCEventHighlightss()
    {
        var eventHighlightss = await _eventHighlightsService.GetAllAsync();
        return Ok(eventHighlightss);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOCRCEventHighlightsById(int id)
    {
        var eventHighlights = await _eventHighlightsService.GetByIdAsync(id);
        
        return Ok(eventHighlights);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOCRCEventHighlights([FromBody] OCRCEventHighlightsPostRequest eventHighlightsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdOCRCEventHighlights = await _eventHighlightsService.CreateAsync(eventHighlightsDto);
        
        return CreatedAtAction(nameof(GetOCRCEventHighlightsById), new { id = createdOCRCEventHighlights.Id }, createdOCRCEventHighlights);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOCRCEventHighlights(int id, [FromBody] OCRCEventHighlightsPatchRequest eventHighlightsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedOCRCEventHighlights = await _eventHighlightsService.UpdateAsync(id, eventHighlightsDto);
        
        return Ok(updatedOCRCEventHighlights);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOCRCEventHighlights(int id)
    {
        await _eventHighlightsService.DeleteAsync(id);
        
        return NoContent();
    }
}