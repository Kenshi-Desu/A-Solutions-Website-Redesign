using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly ITestimonialService _testimonialService;

    public TestimonialsController(ITestimonialService testimonialService)
    {
        _testimonialService = testimonialService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestimonialResponse>>> GetAllTestimonials()
    {
        var testimonials = await _testimonialService.GetAllAsync();
        return Ok(testimonials);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestimonialResponse>> GetTestimonialById(int id)
    {
        var testimonial = await _testimonialService.GetByIdAsync(id);
        
        return Ok(testimonial);
    }

    [HttpPost]
    public async Task<ActionResult<TestimonialResponse>> CreateTestimonial([FromBody] TestimonialPostRequest testimonialDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdTestimonial = await _testimonialService.CreateAsync(testimonialDto);
        
        return CreatedAtAction(nameof(GetTestimonialById), new { id = createdTestimonial.Id }, createdTestimonial);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<TestimonialResponse>> UpdateTestimonial(int id, [FromBody] TestimonialPatchRequest testimonialDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedTestimonial = await _testimonialService.UpdateAsync(id, testimonialDto);
        
        return Ok(updatedTestimonial);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestimonial(int id)
    {
        await _testimonialService.DeleteAsync(id);
        
        return NoContent();
    }
}