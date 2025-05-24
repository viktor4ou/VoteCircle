using API.Models.DTOs.Enitity;
using FluentValidation;

namespace KPMG_API.Validation
{
    internal class EditEntityDtoValidatior : AbstractValidator<EditEntityDTO>
    {
        public EditEntityDtoValidatior()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required")
                .InclusiveBetween(1, int.MaxValue).WithMessage("Id must be in the range of 1 <> 2-147-483-647 (int.MaxValue)");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required!")
                .MinimumLength(3).WithMessage("Minimum length of the title is 3 characters!")
                .MaximumLength(100).WithMessage("Maximum length of the title is 100 characters!");

            RuleFor(x => x.PercentageWeight)
                .NotEmpty().WithMessage("Percentage weight is required")
                .InclusiveBetween(0, 100).WithMessage("Percentage must be between 0 and 100.");

            //Include(new CreateEntityDtoValidator()); 

        }
    }
}
