using API.Data.Constants;
using API.Data.Interfaces;
using API.Models.DTOs.Enitity;
using API.Models.Models;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace KPMG_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "UserOnly")]
    public class EntitesController : ControllerBase // I that there is a typo ;)
    {
        private readonly IEntityRepository entityRepository;
        private readonly IValidator<CreateEntityDTO> createEntityValidator;
        private readonly IValidator<EditEntityDTO> editEntityValidator;
        private readonly IValidator<int> idValidator;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;

        public EntitesController(IEntityRepository entityRepository,
            IValidator<CreateEntityDTO> createEntityValidator,
            IValidator<EditEntityDTO> editEntityValidator,
            IValidator<int> idValidator,
            IMapper mapper,
            UserManager<ApplicationUser> userManager)

        {
            this.entityRepository = entityRepository;
            this.createEntityValidator = createEntityValidator;
            this.editEntityValidator = editEntityValidator;
            this.idValidator = idValidator;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [HttpGet("GetAllEntitesBySessionId")]
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
            var currentUser = await userManager.GetUserAsync(User);
            Entity entitiy = mapper.Map<Entity>(DTO,
                opt => opt.Items["UserId"] = currentUser!.Id);

            entityRepository.Add(entitiy);
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

            var currentUser = await userManager.GetUserAsync(User);
            var currentUserRoles = await userManager.GetRolesAsync(currentUser!);
            if (entity.OwnerId != currentUser!.Id && !currentUserRoles.Contains(UserRole.Admin))
            {
                return Unauthorized("You are not the owner of this entity");
            }

            Entity newEntity = mapper.Map(editDTO, entity);
            entityRepository.Update(newEntity);
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
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserRoles = await userManager.GetRolesAsync(currentUser!);
            if (entity.OwnerId != currentUser!.Id && !currentUserRoles.Contains(UserRole.Admin))
            {
                return Unauthorized("You are not the owner of this entity");
            }
            entityRepository.Delete(entity);
            await entityRepository.SaveChangesAsync();
            Log.Information("Successfully deleted entity {@entity}", entity);
            return Ok(new { message = "Entity was deleted successfully!" });
        }
    }
}
