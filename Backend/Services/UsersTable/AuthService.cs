using A_Solutions_Website_Redesign.Backend.Exceptions;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Model.Entities;
using Supabase.Gotrue; // Added for Gotrue Auth features

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

            if (session == null || session.User == null)
                throw new UnauthorizedAccessException("Invalid email or password.");

            _logger.LogInformation("Successful login for email: {Email}", request.Email);

            return new AuthResponse
            {
                // Added ?? string.Empty to satisfy the non-null requirement and fix the CS8601 warning
                AccessToken = session.AccessToken ?? string.Empty,
                RefreshToken = session.RefreshToken ?? string.Empty,
                ExpiresIn = session.ExpiresIn,
                Email = session.User.Email
            };
        }
        catch (Exception ex) when (ex is not UnauthorizedAccessException)
        {
            _logger.LogWarning("Supabase login failed for email {Email}. Reason: {Message}", request.Email, ex.Message);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }
    }

    // STEP 1: Send the Code & Save Profile Data Temporarily
    public async Task RegisterUserAsync(UsersPostRequest request)
    {
        // We stash the Username and Role securely inside Supabase's hidden UserMetadata
        var options = new SignUpOptions
        {
            Data = new Dictionary<string, object>
            {
                { "username", request.Username },
                { "role", request.Role }
            }
        };

        var session = await _supabaseClient.Auth.SignUp(request.Email, request.Password, options);
        
        if (session == null || session.User == null)
            throw new Exception("Failed to register user with Supabase.");
            
        _logger.LogInformation("Sent OTP verification code to {Email}", request.Email);
    }

    // STEP 2: Verify the Code & Insert into custom `users` database
    public async Task<AuthResponse> VerifyEmailAsync(VerifyOtpRequest request)
    {
        try
        {
            // 1. Verify the 6-digit code with Supabase
            var session = await _supabaseClient.Auth.VerifyOTP(
                request.Email, 
                request.Code, 
                Constants.EmailOtpType.Signup
            );

            if (session == null || session.User == null)
                throw new UnauthorizedAccessException("Invalid or expired verification code.");

            // 2. Extract the metadata we saved during Step 1
            var username = session.User.UserMetadata?["username"]?.ToString() ?? "Unknown";
            var role = session.User.UserMetadata?["role"]?.ToString() ?? "User";

            // 3. Now that they are verified, save them to your custom `users` table!
            var newUser = new Users
            {
                // Added ?? string.Empty here because the SDK marks User.Id as a nullable string?
                Id = session.User.Id ?? string.Empty, 
                Email = session.User.Email ?? request.Email,
                Username = username,
                Role = role,
                LastLoginAt =DateTime.UtcNow
            };

            var response = await _supabaseClient.From<Users>().Insert(newUser);

            if (response.Models.Count == 0)
            {
                _logger.LogError("Failed to insert verified user {Email} into custom users table.", request.Email);
                throw new FailedToCreateException("User verified, but failed to create database profile.");
            }

            _logger.LogInformation("Successfully verified and created user profile: {Email}", request.Email);

            // 4. Return the token so the React frontend can log them in instantly!
            return new AuthResponse
            {
                // Added ?? string.Empty to satisfy the non-null requirement and fix the CS8601 warning
                AccessToken = session.AccessToken ?? string.Empty,
                RefreshToken = session.RefreshToken ?? string.Empty,
                ExpiresIn = session.ExpiresIn,
                Email = newUser.Email,
                Username = newUser.Username,
                Role = newUser.Role
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning("OTP Verification failed for {Email}: {Message}", request.Email, ex.Message);
            throw new UnauthorizedAccessException("Invalid or expired verification code.");
        }
    }
}