using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Services.Base;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class TestimonialService : CrudServiceBase<Testimonial, TestimonialResponse, TestimonialPostRequest, TestimonialPatchRequest>, ITestimonialService
{
    public TestimonialService(Supabase.Client supabaseClient) : base(supabaseClient)
    {
    }

    protected override Testimonial MapToEntity(TestimonialPostRequest dto)
    {
        return new Testimonial
        {
            AuthorName = dto.AuthorName,
            AuthorRole = dto.AuthorRole,
            Content = dto.Content,
            IsApproved = dto.IsApproved,
            Rate = dto.Rate
        };
    }

    protected override void ApplyPatch(TestimonialPatchRequest dto, Testimonial entity)
    {
        if (!string.IsNullOrEmpty(dto.AuthorName)) entity.AuthorName = dto.AuthorName;
        if (!string.IsNullOrEmpty(dto.AuthorRole)) entity.AuthorRole = dto.AuthorRole;
        if (!string.IsNullOrEmpty(dto.Content)) entity.Content = dto.Content;
        entity.IsApproved = dto.IsApproved;
        entity.Rate = dto.Rate;
    }

    protected override TestimonialResponse MapToResponse(Testimonial entity)
    {
        return new TestimonialResponse
        {
            Id = entity.Id,
            AuthorName = entity.AuthorName,
            AuthorRole = entity.AuthorRole,
            Content = entity.Content,
            IsApproved = entity.IsApproved,
            Rate = entity.Rate,
            CreatedAt = entity.CreatedAt
        };
    }
}