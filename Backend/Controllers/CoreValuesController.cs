using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoreValuesController : ControllerBase
{
    private readonly ICoreValuesService _coreValuesService;

    public CoreValuesController(ICoreValuesService coreValuesService)
    {
        _coreValuesService = coreValuesService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoreValuesResponse>>> GetAllCoreValuess()
    {
        var coreValuess = await _coreValuesService.GetAllAsync();
        return Ok(coreValuess);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CoreValuesResponse>> GetCoreValuesById(int id)
    {
        var coreValues = await _coreValuesService.GetByIdAsync(id);
        
        return Ok(coreValues);
    }

    [HttpPost]
    public async Task<ActionResult<CoreValuesResponse>> CreateCoreValues([FromBody] CoreValuesPostRequest coreValuesDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdCoreValues = await _coreValuesService.CreateAsync(coreValuesDto);
        
        return CreatedAtAction(nameof(GetCoreValuesById), new { id = createdCoreValues.Id }, createdCoreValues);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<CoreValuesResponse>> UpdateCoreValues(int id, [FromBody] CoreValuesPatchRequest coreValuesDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedCoreValues = await _coreValuesService.UpdateAsync(id, coreValuesDto);
        
        return Ok(updatedCoreValues);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCoreValues(int id)
    {
        await _coreValuesService.DeleteAsync(id);
        
        return NoContent();
    }
}