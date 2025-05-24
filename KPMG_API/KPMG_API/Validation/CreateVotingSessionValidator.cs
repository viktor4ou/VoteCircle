using API.Models.DTOs.VotingSession;
using FluentValidation;

namespace KPMG_API.Validation
{
    public class CreateVotingSessionValidator : AbstractValidator<CreateVotingSessionDTO>
    {
        public CreateVotingSessionValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required!")
                .MinimumLength(3).WithMessage("Minimum length of the title is 3 characters!")
                .MaximumLength(100).WithMessage("Maximum length of the title is 100 characters!");

            RuleFor(x => x.Description)
                .MaximumLength(100).WithMessage("Maximum length of the description is 100 characters");

            RuleFor(x => x.ScheduledUntil)
                .NotEmpty().WithMessage("Scheduled date can't me empty")
                .GreaterThanOrEqualTo(_ => DateTime.Now.AddMinutes(-5))
                .WithMessage("Scheduled time must be now or within the last 5 minutes.");

        }
    }
}
