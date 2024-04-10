using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vacations
{
    public class Details
    {
      
        public class Query : IRequest<Result<VacationDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<VacationDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
             private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<VacationDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vacation = await _context.Vacations.ProjectTo<VacationDto>(_mapper.ConfigurationProvider, new {currentUserName = _userAccessor.GetUserName()})
                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<VacationDto>.Success(vacation);
            }
        }
    }
}