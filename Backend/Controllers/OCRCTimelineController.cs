using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OCRCTimelineController : ControllerBase
{
    private readonly IOCRCTimelineService _timelineService;

    public OCRCTimelineController(IOCRCTimelineService timelineService)
    {
        _timelineService = timelineService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOCRCTimelines()
    {
        var timelines = await _timelineService.GetAllAsync();
        return Ok(timelines);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOCRCTimelineById(int id)
    {
        var timeline = await _timelineService.GetByIdAsync(id);
        if (timeline == null)
        {
            return NotFound();
        }
        return Ok(timeline);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOCRCTimeline([FromBody] OCRCTimelinePostRequest timelineDtos)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdTimeline = await _timelineService.CreateAsync(timelineDtos);
        return CreatedAtAction(nameof(GetOCRCTimelineById), new { id = createdTimeline.Id }, createdTimeline);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOCRCTimeline(int id, [FromBody] OCRCTimelinePatchRequest timelineDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedTimeline = await _timelineService.UpdateAsync(id, timelineDto);
        if (updatedTimeline == null)
        {
            return NotFound();
        }
        return Ok(updatedTimeline);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOCRCTimeline(int id)
    {
        var result = await _timelineService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}