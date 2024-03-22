using Domain;
using FluentValidation;
namespace Application.Vacations
{
    public class VacationValidator : AbstractValidator<Domain.Vacation>
    {
        public VacationValidator(){
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.StartDate).NotEmpty();
            RuleFor(x => x.EndDate).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }    
    }
}