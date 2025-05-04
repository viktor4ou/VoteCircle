using API.Data.Interfaces;
using API.Models.DTOs.VotingSession;
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
    public class VotingSessionsController : ControllerBase
    {
        private readonly IVotingSessionRepository sessionRepository;
        private readonly IValidator<CreateVotingSessionDTO> createVotingSessionValidator;
        private readonly IValidator<int> idValidator;
        private readonly IMapper mapper;

        public VotingSessionsController(IVotingSessionRepository sessionRepository,
            IValidator<CreateVotingSessionDTO> createVotingSessionValidator,
            IValidator<int> idValidator,
            IMapper mapper)
        {
            this.sessionRepository = sessionRepository;
            this.createVotingSessionValidator = createVotingSessionValidator;
            this.idValidator = idValidator;
            this.mapper = mapper;
        }

        [HttpGet("GetAllSessions")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllSessions()
        {
            var result = await sessionRepository.GetAllAsync();
            Log.Information("Successfully fetched all sessions {@result}", result);
            return Ok(result);
        }

        [HttpPost("CreateVotingSession")]
        public async Task<IActionResult> CreateVotingSession(CreateVotingSessionDTO dto)
        {
            var validationResult = createVotingSessionValidator.Validate(dto);
            if (!validationResult.IsValid)
            {
                HttpValidationProblemDetails validationProblemDetails = new(validationResult.ToDictionary())
                {
                    Type = typeof(CreateVotingSessionDTO).ToString(),
                    Title = "Validation Failed",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "One or more validations errors occured",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }
                };
                Log.Error("Validation error {@validationProblemDetails}", validationProblemDetails);
                return BadRequest(validationProblemDetails);
            }

            VotingSession session = mapper.Map<VotingSession>(dto);

            await sessionRepository.AddAsync(session);
            await sessionRepository.SaveChangesAsync();
            Log.Information("Successfully created session with {@session}", session);
            return Ok(new { message = "Voting session was created successfully!" });
        }

        [HttpDelete("DeleteVotingSession/{id}")]
        public async Task<IActionResult> DeleteVotingSession(int id)
        {
            var validationResult = idValidator.Validate(id);
            if (!validationResult.IsValid)
            {
                return BadRequest(new HttpValidationProblemDetails(validationResult.ToDictionary()));
            }

            var searchedSession = await sessionRepository.GetSessionById(id);

            if (searchedSession == null)
            {
                ProblemDetails problemDetails = new()
                {
                    Type = "Voting Session Error",
                    Title = "Voting session not found",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = $"No voting session found with id: {id}",
                    Instance = $"{HttpContext.Request.Method} {HttpContext.Request.Path}",
                    Extensions = { ["date"] = DateTime.UtcNow.ToString("R") }

                };
                Log.Error("Bad Request {@problemDetails}", problemDetails);
                return BadRequest(problemDetails);
            }

            sessionRepository.Delete(searchedSession);
            await sessionRepository.SaveChangesAsync();
            Log.Information("Successfully delted session {@searchedSession}", searchedSession);
            return Ok(new { message = "Voting session was deleted successfully!" });
        }
    }
}
