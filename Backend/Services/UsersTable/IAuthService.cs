using A_Solutions_Website_Redesign.Backend.Model.Dtos;

namespace A_Solutions_Website_Redesign.Backend.Services;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task RegisterUserAsync(UsersPostRequest request);
    Task<AuthResponse> VerifyEmailAsync(VerifyOtpRequest request);
}