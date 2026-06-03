using Postgrest.Models;
using A_Solutions_Website_Redesign.Backend.Exceptions;

namespace A_Solutions_Website_Redesign.Backend.Services.Base;

public abstract class SingletonServiceBase<TEntity, TResponseDto, TPatchDto> where TEntity : BaseModel, new()
{
    protected readonly Supabase.Client _supabaseClient;
    protected const int SingletonId = 1;

    protected SingletonServiceBase(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    protected abstract void ApplyPatch(TPatchDto dto, TEntity entity);
    protected abstract TResponseDto MapToResponse(TEntity entity);

    protected virtual async Task<TEntity> GetAsync()
    {
        await _supabaseClient.InitializeAsync();

        var result = await _supabaseClient.From<TEntity>()
            .Filter("id", Postgrest.Constants.Operator.Equals, SingletonId.ToString())
            .Single();

        if (result == null)
            throw new NotFoundException($"{typeof(TEntity).Name} configuration not found. Please ensure row ID={SingletonId} exists in the database.");

        return result;
    }

    public virtual async Task<TResponseDto> UpdateAsync(TPatchDto dto)
    {
        // Fetches raw entity (throws NotFoundException automatically if missing)
        var entity = await GetAsync();

        ApplyPatch(dto, entity);

        await _supabaseClient.InitializeAsync();
        var response = await _supabaseClient.From<TEntity>().Update(entity);
        
        var updatedEntity = response.Model;
        if (updatedEntity == null)
            throw new FailedToUpdateException($"Failed to update {typeof(TEntity).Name} singleton record.");

        return MapToResponse(updatedEntity);
    }
}