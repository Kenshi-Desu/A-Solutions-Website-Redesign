using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    private readonly IServiceService _serviceService;

    public ServiceController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllServices()
    {
        var services = await _serviceService.GetAllAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetServiceById(int id)
    {
        var service = await _serviceService.GetByIdAsync(id);
        if (service == null)
        {
            return NotFound();
        }
        return Ok(service);
    }

    [HttpPost]
    public async Task<IActionResult> CreateService([FromBody] ServicePostRequest serviceDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdService = await _serviceService.CreateAsync(serviceDto);
        return CreatedAtAction(nameof(GetServiceById), new { id = createdService.Id }, createdService);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] ServicePatchRequest serviceDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedService = await _serviceService.UpdateAsync(id, serviceDto);
        if (updatedService == null)
        {
            return NotFound();
        }
        return Ok(updatedService);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        var deleted = await _serviceService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}