using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using A_Solutions_Website_Redesign.Backend.Exceptions;

namespace A_Solutions_Website_Redesign.Backend.Services;

public class AuthService : IAuthService
{
    private readonly Supabase.Client _supabaseClient;
    private readonly ILogger<AuthService> _logger;

    public AuthService(Supabase.Client supabaseClient, ILogger<AuthService> logger)
    {
        _supabaseClient = supabaseClient;
        _logger = logger;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        try
        {
            var session = await _supabaseClient.Auth.SignIn(request.Email, request.Password);

            if (session == null || session.AccessToken == null)
            {
                _logger.LogWarning("Failed login attempt for Email: {Email}", request.Email);
                throw new UnauthorizedAccessException("Invalid login credentials.");
            }

            _logger.LogInformation("Successful login for email: {Email}", request.Email);

            return new AuthResponse
            {
                AccessToken = session.AccessToken,
                RefreshToken = session.RefreshToken ?? string.Empty,
                ExpiresIn = session.ExpiresIn
            };
        }
        catch (Exception ex) when (ex is not UnauthorizedAccessException)
        {
            _logger.LogWarning(ex, "Authentication failed for email: {Email}", request.Email);
            throw new UnauthorizedAccessException("Access email or password.");
        }
    }

    public async Task RegisterUserAsync(UsersPostRequest request)
    {
        var authSession = await _supabaseClient.Auth.SignUp(request.Email, request.Password);

        if (authSession?.User?.Id == null)
        {
            _logger.LogWarning("Supabase Auth failed to create user record for {Email}", request.Email);
            throw new FailedToCreateException("Failed to create user authentication record.");
        }

        var newUserProfile = new Users
        {
            Id = authSession.User.Id,
            Email = request.Email,
            Username = request.Username,
            Role = request.Role
        };

        var response = await _supabaseClient.From<Users>().Insert(newUserProfile);

        if (response.Model == null)
        {
            throw new FailedToCreateException("Failed to save the user profile to the database.");
        }

        _logger.LogInformation("Successful registered new user profile: {Email}", request.Email);
    }
}