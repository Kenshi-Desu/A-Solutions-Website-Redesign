using A_Solutions_Website_Redesign.Backend.Exceptions;
using System.Net;
using System.Text.Json;

namespace A_Solutions_Website_Redesign.Backend.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Proceed to the next middleware (e.g., controllers)
                await _next(context);
            }
            catch (Exception ex)
            {
                // If an exception escapes the controllers/services, catch it here
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            
            var response = new ErrorResponse();

            switch (exception)
            {
                // 1. Handle our custom NotFoundException (Return 404)
                case NotFoundException e:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response.StatusCode = context.Response.StatusCode;
                    response.Message = e.Message;
                    _logger.LogWarning(exception, "Resource not found.");
                    break;

                // 2. Handle custom FailedToCreateException (Return 400 Bad Request)
                case FailedToCreateException e:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response.StatusCode = context.Response.StatusCode;
                    response.Message = e.Message;
                    _logger.LogWarning(exception, "A database insert operation failed.");
                    break;

                // 3. Handle custom FailedToUpdateException (Return 400 Bad Request)
                case FailedToUpdateException e:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response.StatusCode = context.Response.StatusCode;
                    response.Message = e.Message;
                    _logger.LogWarning(exception, "A database update operation failed.");
                    break;

                // 4. Handle Entity Framework's InvalidOperationException if you still use .First()
                case InvalidOperationException e when e.Message.Contains("Sequence contains no elements"):
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response.StatusCode = context.Response.StatusCode;
                    response.Message = "The requested resource could not be found in the database.";
                    _logger.LogWarning(exception, "Resource not found (caught via InvalidOperationException).");
                    break;

                // 5. Handle all other unhandled exceptions (Return 500)
                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    response.StatusCode = context.Response.StatusCode;
                    response.Message = "An unexpected internal server error occurred.";
                    // Log the actual error securely without exposing details to the client
                    _logger.LogError(exception, "An unhandled exception occurred.");
                    break;
            }

            var result = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(result);
        }
    }

    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}