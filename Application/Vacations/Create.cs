using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vacations
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Vacation Vacation { get; set; }
        }
        public class CommandValidatior : AbstractValidator<Command>
        {
            public CommandValidatior()
            {
                RuleFor(x => x.Vacation).SetValidator(new VacationValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user != null)
                {
                    request.Vacation.HostUserName = user.UserName;
                }
                
                request.Vacation.Host = user;
                _context.Vacations.Add(request.Vacation);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create a vacation");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}