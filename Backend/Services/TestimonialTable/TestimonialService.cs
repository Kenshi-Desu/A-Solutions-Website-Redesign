using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class TestimonialService : ITestimonialService
{
    private readonly Supabase.Client _supabaseClient;

    public TestimonialService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<TestimonialResponse>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<Testimonial>().Get();

        return response.Models.Select(t => new TestimonialResponse
            {
                Id = t.Id,
                Rate = t.Rate,
                AuthorName = t.AuthorName,
                AuthorRole = t.AuthorRole,
                Content = t.Content,
                IsApproved = t.IsApproved,
            })
            .ToList();
    }

    public async Task<TestimonialResponse> GetByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<Testimonial>()
            .Match(new Dictionary<string, string> { { "id", id.ToString() } })
            .Single();

        if (response == null) 
            throw new InvalidOperationException("Testimonial not found.");

        return new TestimonialResponse
        {
            Id = response.Id,
            Rate = response.Rate,
            AuthorName = response.AuthorName,
            AuthorRole = response.AuthorRole,
            Content = response.Content,
            IsApproved = response.IsApproved,
        };
    }

    public async Task<TestimonialResponse> CreateAsync(TestimonialPostRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var testimonial = new Testimonial
        {
            Rate = request.Rate,
            AuthorName = request.AuthorName,
            AuthorRole = request.AuthorRole,
            Content = request.Content,
            IsApproved = request.IsApproved,
        };

        var response = await _supabaseClient.From<Testimonial>().Insert(testimonial);
        var createdTestimonial = response.Model;

        if (createdTestimonial == null) 
            throw new InvalidOperationException("Failed to save record to Supabase backend database.");

        return new TestimonialResponse
        {
            Id = createdTestimonial.Id,
            Rate = createdTestimonial.Rate,
            AuthorName = createdTestimonial.AuthorName,
            AuthorRole = createdTestimonial.AuthorRole,
            Content = createdTestimonial.Content,
            IsApproved = createdTestimonial.IsApproved,
        };
    }

    public async Task<TestimonialResponse> UpdateAsync(int id, TestimonialPatchRequest request)
    {
        await _supabaseClient.InitializeAsync();

        var testimonialToUpdate = new Testimonial
        {
            Id = id,
            Rate = request.Rate,
            AuthorName = request.AuthorName,
            AuthorRole = request.AuthorRole,
            Content = request.Content,
            IsApproved = request.IsApproved,
        };

        var response = await _supabaseClient.From<Testimonial>().Update(testimonialToUpdate);
        var updatedTestimonial = response.Model;

        if (updatedTestimonial == null) 
            throw new InvalidOperationException("Failed to update testimonial.");

        return new TestimonialResponse
        {
            Id = updatedTestimonial.Id,
            Rate = updatedTestimonial.Rate,
            AuthorName = updatedTestimonial.AuthorName,
            AuthorRole = updatedTestimonial.AuthorRole,
            Content = updatedTestimonial.Content,
            IsApproved = updatedTestimonial.IsApproved,
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var testimonialToDelete = new Testimonial { Id = id };

        try
        {
            await _supabaseClient.From<Testimonial>().Delete(testimonialToDelete);
            return true;
        }
        catch
        {
            return false;
        }
    }
}