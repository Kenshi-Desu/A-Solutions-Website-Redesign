using Supabase;
using Serilog;
using A_Solutions_Website_Redesign.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

var supabaseUrl = builder.Configuration["Supabase:Url"];
var supabaseKey = builder.Configuration["Supabase:Key"];

if (string.IsNullOrEmpty(supabaseUrl) || string.IsNullOrEmpty(supabaseKey))
{
    throw new InvalidOperationException("Supabase URL or Publishable Key configuration is missing or empty in appsettings.json.");
}

builder.Services.AddSingleton(provider =>
    new Supabase.Client(supabaseUrl, supabaseKey, new Supabase.SupabaseOptions
    {
        AutoRefreshToken = true,
        AutoConnectRealtime = true
    }));

builder.Host.UseSerilog((context, configuration) => 
    configuration
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
        .WriteTo.Console()
        .WriteTo.File("Logs/api-log-.txt", rollingInterval: RollingInterval.Day)
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // Replace with your actual frontend URL (e.g. localhost:5173 or localhost:3000)
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IAffiliateService, AffiliateService>();
builder.Services.AddScoped<IAchievementService, AchievementService>();
builder.Services.AddScoped<ITestimonialService, TestimonialService>();
builder.Services.AddScoped<IOCRCEventDetailsService, OCRCEventDetailsService>();
builder.Services.AddScoped<IOCRCEventHighlightsService, OCRCEventHighlightsService>();
builder.Services.AddScoped<IOCRCTimelineService, OCRCTimelineService>();
builder.Services.AddScoped<IMissionVisionService, MissionVisionService>();
builder.Services.AddScoped<ICoreValuesService, CoreValuesService>();
builder.Services.AddScoped<ITeamMembersService, TeamMembersService>();
builder.Services.AddScoped<IContactSettingsService, ContactSettingsService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<A_Solutions_Website_Redesign.Backend.Middleware.ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "A Solutions API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
