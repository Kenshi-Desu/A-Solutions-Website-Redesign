using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OCRCTimelinesController : ControllerBase
{
    private readonly IOCRCTimelineService _timelineService;

    public OCRCTimelinesController(IOCRCTimelineService timelineService)
    {
        _timelineService = timelineService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OCRCTimelineResponse>>> GetAllOCRCTimelines()
    {
        var timelines = await _timelineService.GetAllAsync();
        return Ok(timelines);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OCRCTimelineResponse>> GetOCRCTimelineById(int id)
    {
        var timeline = await _timelineService.GetByIdAsync(id);
        
        return Ok(timeline);
    }

    [HttpPost]
    public async Task<ActionResult<OCRCTimelineResponse>> CreateOCRCTimeline([FromBody] OCRCTimelinePostRequest timelineDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdOCRCTimeline = await _timelineService.CreateAsync(timelineDto);
        
        return CreatedAtAction(nameof(GetOCRCTimelineById), new { id = createdOCRCTimeline.Id }, createdOCRCTimeline);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<OCRCTimelineResponse>> UpdateOCRCTimeline(int id, [FromBody] OCRCTimelinePatchRequest timelineDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedOCRCTimeline = await _timelineService.UpdateAsync(id, timelineDto);
        
        return Ok(updatedOCRCTimeline);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOCRCTimeline(int id)
    {
        await _timelineService.DeleteAsync(id);
        
        return NoContent();
    }
}