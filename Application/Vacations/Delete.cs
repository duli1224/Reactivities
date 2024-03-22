using Application.Core;
using MediatR;
using Persistence;

namespace Application.Vacations
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id{get; set;}
        }

        public class Handler : IRequestHandler<Command ,Result<Unit>>
        {
        private readonly DataContext _Context;
            public Handler(DataContext Context)
            {
                 _Context = Context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vacation = await _Context.Vacations.FindAsync(request.Id);
                if (vacation == null) 
                    return null;
                _Context.Activities.RemoveRange(vacation.Activities);
                _Context.Remove(vacation);
                var result = await _Context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete the vacation");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}