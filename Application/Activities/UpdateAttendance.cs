using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handle : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public readonly IUserAccessor _UserAccessor;
            public Handle(DataContext context, IUserAccessor userAccessor)
            {
                _UserAccessor = userAccessor;
                _context = context;
            }

            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) 
                    return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _UserAccessor.GetUserName());

                if (user == null)
                    return null;

                var hotseUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hotseUserName == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hotseUserName != user.UserName)
                    activity.Attendees.Remove(attendance);
                
                if (attendance == null)
                {
                    attendance = new ActivityAttendee{
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update attendance");

            }
        }
    }
}