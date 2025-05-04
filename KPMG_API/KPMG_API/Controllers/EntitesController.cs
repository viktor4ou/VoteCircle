using API.Data.Interfaces;
using API.Models.DTOs.Enitity;
using API.Models.Models;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace KPMG_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EntitesController : ControllerBase
    {
        private readonly IEntityRepository entityRepository;
        private readonly IValidator<CreateEntityDTO> createEntityValidator;
        private readonly IValidator<EditEntityDTO> editEntityValidator;
        private readonly IValidator<int> idValidator;
        private readonly IMapper mapper;

        public EntitesController(IEntityRepository entityRepository,
            IValidator<CreateEntityDTO> createEntityValidator,
            IValidator<EditEntityDTO> editEntityValidator,
            IValidator<int> idValidator,
            IMapper mapper)

        {
            this.entityRepository = entityRepository;
            this.createEntityValidator = createEntityValidator;
            this.editEntityValidator = editEntityValidator;
            this.idValidator = idValidator;
            this.mapper = mapper;
        }

        [HttpGet("GetAllEntitesBySessionId")]
        [Authorize]
        public async Task<IActionResult> GetAllEntitesBySessionId(int sessionId)
        {
            var validationResult = idValidator.Validate(sessionId);
            if (!validationResult.IsValid)
            {
                return BadRequest(new HttpValidationProblemDetails(validationResult.ToDictionary()));
            }
            IEnumerable<Entity> result = await entityRepository.GetAllEntitesBySessionId(sessionId);
            Log.Information("Successfully fetched entities {@result}", result);
            return Ok(result);
        }

        [HttpPost("CreateEntity")]
        public async Task<IActionResult> CreateEntity(CreateEntityDTO DTO)
        {
            var validationResults = createEntityValidator.Validate(DTO);
            if (!validationResults.IsValid)
            {
                HttpValidationProblemDetails validationProblemDetails = new(validationResults.ToDictionary())
                {
                    Type = typeof(CreateEntityDTO).ToString(),
                    Title = "Validation Failed",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "One or more validations errors occured",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }
                };
                Log.Error("Validation error {@ValidationProblemDetails}", validationProblemDetails);
                return BadRequest(validationProblemDetails);

            }
            Entity entitiy = mapper.Map<Entity>(DTO);

            await entityRepository.AddAsync(entitiy);
            await entityRepository.SaveChangesAsync();
            Log.Information("Successfully created entity {@entitiy}", entitiy);
            return Ok(new { message = "Entity was created successfully!" });
        }

        [HttpPatch("EditEntity")]
        public async Task<IActionResult> UpdateEntity(EditEntityDTO editDTO)
        {
            var validationResult = editEntityValidator.Validate(editDTO);
            if (!validationResult.IsValid)
            {
                HttpValidationProblemDetails validationProblemDetails = new(validationResult.ToDictionary())
                {
                    Type = typeof(EditEntityDTO).ToString(),
                    Title = "Validation Failed",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "One or more validations errors occured",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }

                };
                Log.Error("Validation Error {@validationProblemDetails}", validationProblemDetails);
                return BadRequest(validationProblemDetails);
            }

            Entity entity = await entityRepository.GetByIdAsync(editDTO.Id);
            if (entity is null)
            {
                ProblemDetails problemDetails = new()
                {
                    Type = "Entity Error",
                    Title = "Entity not found",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = $"No entity found with id: {editDTO.Id}",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }

                };
                Log.Error("Bad Request {@problemDetails}", problemDetails);
                return BadRequest(problemDetails);

            }
            Entity entitiy = mapper.Map<Entity>(editDTO);

            entityRepository.Update(entity);
            await entityRepository.SaveChangesAsync();
            Log.Information("Successfully updated entity {@entity}", entity);
            return Ok(new { message = "Entity was updated successfully!" });
        }

        [HttpDelete("DeleteEntity/{id}")]
        public async Task<IActionResult> DeleteEntityAsync(int id)
        {
            var validationResult = idValidator.Validate(id);
            if (!validationResult.IsValid)
            {
                return BadRequest(new HttpValidationProblemDetails(validationResult.ToDictionary()));
            }

            var entity = await entityRepository.GetByIdAsync(id);

            if (entity is null)
            {
                ProblemDetails problemDetails = new()
                {
                    Type = "Entity Error",
                    Title = "Entity not found",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = $"No entity found with id: {id}",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }

                };

                Log.Error("Bad Request {@problemDetails}", problemDetails);

                return BadRequest(problemDetails);
            }

            entityRepository.Delete(entity);
            await entityRepository.SaveChangesAsync();
            Log.Information("Successfully deleted entity {@entity}", entity);
            return Ok(new { message = "Entity was deleted successfully!" });
        }
    }
}
