using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ProfileActivityList
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string UserName { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities.Where(a => a.Attendees.Any(att => att.AppUser.UserName == request.UserName))
                .OrderBy(d => d.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUserName() })
                .AsQueryable();

                query = request.Predicate switch
                {
                    "hosting" => query.Where(x => x.HostUserName == request.UserName),
                    "future" => query.Where(d => d.Date >= DateTime.UtcNow),
                    _ => query.Where(d => d.Date <= DateTime.UtcNow),
                };

                var activityList = await query.ToListAsync();
                return Result<List<UserActivityDto>>.Success(activityList);
            }
        }
    }
}
