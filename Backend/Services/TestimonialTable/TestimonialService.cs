using Microsoft.EntityFrameworkCore;
using A_Solutions_Website_Redesign.Backend.Data;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class TestimonialService : ITestimonialService
{
    private readonly AppDbContext _context;

    public TestimonialService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TestimonialResponse>> GetAllAsync()
    {
        return await _context.Testimonials
            .Select(t => new TestimonialResponse
            {
                Id = t.Id,
                Rate = t.Rate,
                AuthorName = t.AuthorName,
                AuthorRole = t.AuthorRole,
                Content = t.Content,
                IsApproved = t.IsApproved,
            })
            .ToListAsync();
    }

    public async Task<TestimonialResponse> GetByIdAsync(int id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null) return null;

        return new TestimonialResponse
        {
            Id = testimonial.Id,
            Rate = testimonial.Rate,
            AuthorName = testimonial.AuthorName,
            AuthorRole = testimonial.AuthorRole,
            Content = testimonial.Content,
            IsApproved = testimonial.IsApproved,
        };
    }

    public async Task<TestimonialResponse> CreateAsync(TestimonialPostRequest request)
    {
        var testimonial = new Testimonial
        {
            Rate = request.Rate,
            AuthorName = request.AuthorName,
            AuthorRole = request.AuthorRole,
            Content = request.Content,
            IsApproved = request.IsApproved,
        };

        _context.Testimonials.Add(testimonial);
        await _context.SaveChangesAsync();

        return new TestimonialResponse
        {
            Id = testimonial.Id,
            Rate = testimonial.Rate,
            AuthorName = testimonial.AuthorName,
            AuthorRole = testimonial.AuthorRole,
            Content = testimonial.Content,
            IsApproved = testimonial.IsApproved,
        };
    }

    public async Task<TestimonialResponse> UpdateAsync(int id, TestimonialPatchRequest request)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null) return null;

        testimonial.Rate = request.Rate;
        testimonial.AuthorName = request.AuthorName;
        testimonial.AuthorRole = request.AuthorRole;
        testimonial.Content = request.Content;
        testimonial.IsApproved = request.IsApproved;

        await _context.SaveChangesAsync();

        return new TestimonialResponse
        {
            Id = testimonial.Id,
            Rate = testimonial.Rate,
            AuthorName = testimonial.AuthorName,
            AuthorRole = testimonial.AuthorRole,
            Content = testimonial.Content,
            IsApproved = testimonial.IsApproved,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null) return false;

        _context.Testimonials.Remove(testimonial);
        await _context.SaveChangesAsync();
        return true;
    }
}