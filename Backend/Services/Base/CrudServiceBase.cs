using Postgrest.Models;
using A_Solutions_Website_Redesign.Backend.Exceptions;

namespace A_Solutions_Website_Redesign.Backend.Services.Base;

public abstract class CrudServiceBase<TEntity, TResponseDto, TPostDto, TPatchDto> : ICrudServiceBase<TResponseDto, TPostDto, TPatchDto> where TEntity : BaseModel, new ()
{
    protected readonly Supabase.Client _supabaseClient;
    protected readonly ILogger _logger;

    protected CrudServiceBase(Supabase.Client supabaseClient, ILogger logger)
    {
        _supabaseClient = supabaseClient;
        _logger = logger;
    }

    protected abstract TEntity MapToEntity(TPostDto dto);
    protected abstract void ApplyPatch(TPatchDto dto, TEntity entity);
    protected abstract TResponseDto MapToResponse(TEntity entity);

    public virtual async Task<IEnumerable<TResponseDto>> GetAllAsync()
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient.From<TEntity>().Get();

        return response.Models.Select(MapToResponse).ToList();
    }

    public virtual async Task<TResponseDto> GetByIdAsync(int id)
    {
        var entity = await GetEntityByIdAsync(id);
        return MapToResponse(entity);
    }

    public virtual async Task<TResponseDto> CreateAsync(TPostDto dto)
    {
        await _supabaseClient.InitializeAsync();

        var entity = MapToEntity(dto);
        var response = await _supabaseClient.From<TEntity>().Insert(entity);

        var createdEntity = response.Model;
        if (createdEntity == null)
        {
            _logger.LogWarning("Database insert failed for {EntityType}", typeof(TEntity).Name);
            throw new FailedToCreateException($"Failed to save {typeof(TEntity).Name} record to Supabase database.");
        }
        
        _logger.LogInformation("Successfully inserted new {EntityType} record.", typeof(TEntity).Name);
        return MapToResponse(createdEntity);
    }

    public virtual async Task<TResponseDto> UpdateAsync(int id, TPatchDto dto)
    {
        var entity = await GetEntityByIdAsync(id);

        ApplyPatch(dto, entity);

        await _supabaseClient.InitializeAsync();
        var response = await _supabaseClient.From<TEntity>().Update(entity);

        var updatedEntity = response.Model;
        if (updatedEntity == null)
        {
            _logger.LogWarning("Database update failed for {EntityType} with ID {Id}", typeof(TEntity).Name, id);
            throw new FailedToUpdateException($"Failed to update {typeof(TEntity).Name} record.");
        }
        
        _logger.LogInformation("Successfully updated {EntityType} record with ID {Id}.", typeof(TEntity).Name, id);
        return MapToResponse(updatedEntity);
    }

    public virtual async Task DeleteAsync(int id)
    {
        var entity = await GetEntityByIdAsync(id);

        await _supabaseClient.InitializeAsync();
        await _supabaseClient.From<TEntity>().Delete(entity);

        _logger.LogInformation("Successfully deleted {EntityType} record with ID {Id}.", typeof(TEntity).Name, id);
    }

    protected virtual async Task<TEntity> GetEntityByIdAsync(int id)
    {
        await _supabaseClient.InitializeAsync();

        var response = await _supabaseClient
            .From<TEntity>()
            .Filter("id", Postgrest.Constants.Operator.Equals, id.ToString())
            .Single();

        if (response == null)
            throw new NotFoundException($"{typeof(TEntity).Name} with ID {id} was not found.");

        return response;
    }
}