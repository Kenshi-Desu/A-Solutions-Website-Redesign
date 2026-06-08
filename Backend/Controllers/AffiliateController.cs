using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AffiliatesController : ControllerBase
{
    private readonly IAffiliateService _affiliateService;

    public AffiliatesController(IAffiliateService affiliateService)
    {
        _affiliateService = affiliateService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AffiliateResponse>>> GetAllAffiliates()
    {
        var affiliates = await _affiliateService.GetAllAsync();
        return Ok(affiliates);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AffiliateResponse>> GetAffiliateById(int id)
    {
        var affiliate = await _affiliateService.GetByIdAsync(id);
        
        return Ok(affiliate);
    }

    [HttpPost]
    public async Task<ActionResult<AffiliateResponse>> CreateAffiliate([FromBody] AffiliatePostRequest affiliateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdAffiliate = await _affiliateService.CreateAsync(affiliateDto);
        
        return CreatedAtAction(nameof(GetAffiliateById), new { id = createdAffiliate.Id }, createdAffiliate);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<AffiliateResponse>> UpdateAffiliate(int id, [FromBody] AffiliatePatchRequest affiliateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedAffiliate = await _affiliateService.UpdateAsync(id, affiliateDto);
        
        return Ok(updatedAffiliate);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAffiliate(int id)
    {
        await _affiliateService.DeleteAsync(id);
        
        return NoContent();
    }
}