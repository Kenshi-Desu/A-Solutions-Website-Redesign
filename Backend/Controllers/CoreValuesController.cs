using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoreValuesController : ControllerBase
{
    private readonly ICoreValuesService _coreValueService;

    public CoreValuesController(ICoreValuesService coreValueService)
    {
        _coreValueService = coreValueService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCoreValues()
    {
        var coreValueS = await _coreValueService.GetAllAsync();
        return Ok(coreValueS);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCoreValuesById(int id)
    {
        var coreValueS = await _coreValueService.GetByIdAsync(id);
        if (coreValueS == null)
        {
            return NotFound();
        }
        return Ok(coreValueS);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCoreValues([FromBody] CoreValuesPostRequest coreValueSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdCoreValues = await _coreValueService.CreateAsync(coreValueSDto);
        return CreatedAtAction(nameof(GetCoreValuesById), new { id = createdCoreValues.Id }, createdCoreValues);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateCoreValues(int id, [FromBody] CoreValuesPatchRequest coreValueSDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedCoreValues = await _coreValueService.UpdateAsync(id, coreValueSDto);
        if (updatedCoreValues == null)
        {
            return NotFound();
        }
        return Ok(updatedCoreValues);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCoreValues(int id)
    {
        var result = await _coreValueService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}