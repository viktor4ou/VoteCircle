using API.Models.DTOs.Enitity;
using FluentValidation;

namespace KPMG_API.Validation
{
    public class CreateEntityDtoValidator : AbstractValidator<CreateEntityDTO>
    {
        public CreateEntityDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required!")
                .MinimumLength(3).WithMessage("Minimum length of the title is 3 characters!")
                .MaximumLength(100).WithMessage("Maximum length of the title is 100 characters!");

            RuleFor(x => x.PercentageWeight)
                .NotEmpty().WithMessage("Percentage weight is required!")
                .InclusiveBetween(0, 100).WithMessage("Percentage must be between 0 and 100.");
        }
    }
}
