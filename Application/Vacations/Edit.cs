using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vacations
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Vacation Vacation {get; set; }
        }
        public class CommandValidatior: AbstractValidator<Command >{
            public CommandValidatior()
            {
                RuleFor(x => x.Vacation).SetValidator(new VacationValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

            public Handler(DataContext context , IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vacation = await _context.Vacations.FindAsync(request.Vacation.Id);
                if(vacation == null)
                    return null;
                _mapper.Map(request.Vacation, vacation);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result)
                return Result<Unit>.Failure("Failed to update vacation");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}