using Postgrest.Models;
using A_Solutions_Website_Redesign.Backend.Exceptions;

namespace A_Solutions_Website_Redesign.Backend.Services.Base;

public abstract class SingletonServiceBase<TEntity, TResponseDto, TPatchDto> : ISingletonServiceBase<TResponseDto, TPatchDto> where TEntity : BaseModel, new()
{
    protected readonly Supabase.Client _supabaseClient;
    protected readonly ILogger _logger;
    protected const int SingletonId = 1;

    protected SingletonServiceBase(Supabase.Client supabaseClient, ILogger logger)
    {
        _supabaseClient = supabaseClient;
        _logger = logger;
    }

    protected abstract void ApplyPatch(TPatchDto dto, TEntity entity);
    protected abstract TResponseDto MapToResponse(TEntity entity);

    public virtual async Task<TResponseDto> GetAsync()
    {
        var entity = await GetEntityAsync();
        return MapToResponse(entity);
    }

    public virtual async Task<TResponseDto> UpdateAsync(TPatchDto dto)
    {
        // Fetch raw database entity (TEntity) securely
        var entity = await GetEntityAsync();

        // Apply DTO updates directly to the entity
        ApplyPatch(dto, entity);

        await _supabaseClient.InitializeAsync();
        var response = await _supabaseClient.From<TEntity>().Update(entity);
        
        var updatedEntity = response.Model;
        if (updatedEntity == null)
        {
            _logger.LogWarning("Database update failed for {EntityType}.", typeof(TEntity).Name);
            throw new FailedToUpdateException($"Failed to update {typeof(TEntity).Name} singleton record.");
        }

        // Return mapped DTO response
        return MapToResponse(updatedEntity);
    }

    protected virtual async Task<TEntity> GetEntityAsync()
    {
        await _supabaseClient.InitializeAsync();

        var result = await _supabaseClient.From<TEntity>()
            .Filter("id", Postgrest.Constants.Operator.Equals, SingletonId.ToString())
            .Single();

        if (result == null)
            throw new NotFoundException($"{typeof(TEntity).Name} configuration not found. Please ensure row ID={SingletonId} exists in the database.");

        return result;
    }
}