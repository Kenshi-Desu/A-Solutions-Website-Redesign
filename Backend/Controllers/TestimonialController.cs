using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialController : ControllerBase
{
    private readonly ITestimonialService _testimonialService;

    public TestimonialController(ITestimonialService testimonialService)
    {
        _testimonialService = testimonialService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTestimonials()
    {
        var testimonials = await _testimonialService.GetAllAsync();
        return Ok(testimonials);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTestimonialById(int id)
    {
        var testimonial = await _testimonialService.GetByIdAsync(id);
        if (testimonial == null)
        {
            return NotFound();
        }
        return Ok(testimonial);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTestimonial([FromBody] TestimonialPostRequest testimonialDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdTestimonial = await _testimonialService.CreateAsync(testimonialDto);
        return CreatedAtAction(nameof(GetTestimonialById), new { id = createdTestimonial.Id }, createdTestimonial);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateTestimonial(int id, [FromBody] TestimonialPatchRequest testimonialDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedTestimonial = await _testimonialService.UpdateAsync(id, testimonialDto);
        if (updatedTestimonial == null)
        {
            return NotFound();
        }
        return Ok(updatedTestimonial);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestimonial(int id)
    {
        var deleted = await _testimonialService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}