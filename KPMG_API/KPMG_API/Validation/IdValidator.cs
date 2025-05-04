using FluentValidation;

namespace KPMG_API.Validation
{
    public class IdValidator : AbstractValidator<int>
    {
        public IdValidator()
        {
            RuleFor(id => id)
                .InclusiveBetween(1, int.MaxValue)
                .WithMessage("Id must be a positive integer.");
        }
    }
}
