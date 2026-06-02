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
    public async Task<IActionResult> GetAllOCRCEventHighlights()
    {
        var eventHighlights = await _eventHighlightsService.GetAllAsync();
        return Ok(eventHighlights);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOCRCEventHighlightsById(int id)
    {
        var eventHighlights = await _eventHighlightsService.GetByIdAsync(id);
        if (eventHighlights == null)
        {
            return NotFound();
        }
        return Ok(eventHighlights);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOCRCEventHighlights([FromBody] OCRCEventHighlightsPostRequest eventHighlightsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdEventHighlights = await _eventHighlightsService.CreateAsync(eventHighlightsDto);
        return CreatedAtAction(nameof(GetOCRCEventHighlightsById), new { id = createdEventHighlights.Id }, createdEventHighlights);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOCRCEventHighlights(int id, [FromBody] OCRCEventHighlightsPatchRequest eventHighlightsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedEventHighlights = await _eventHighlightsService.UpdateAsync(id, eventHighlightsDto);
        if (updatedEventHighlights == null)
        {
            return NotFound();
        }
        return Ok(updatedEventHighlights);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOCRCEventHighligts(int id)
    {
        var result = await _eventHighlightsService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}