using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id{get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _Context;
            public Handler(DataContext Context)
            {
                 _Context = Context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _Context.Activities.FindAsync(request.Id);

                _Context.Remove(activity);

                await _Context.SaveChangesAsync();
                

            }
        }
    }
}