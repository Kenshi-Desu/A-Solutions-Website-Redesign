using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface ITestimonialService
{
    Task<IEnumerable<TestimonialResponse>> GetAllAsync();
    Task<TestimonialResponse> GetByIdAsync(int id);
    Task<TestimonialResponse> CreateAsync(TestimonialPostRequest request);
    Task<TestimonialResponse> UpdateAsync(int id, TestimonialPatchRequest request);
    Task<bool> DeleteAsync(int id);
}