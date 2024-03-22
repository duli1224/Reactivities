using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vacations
{
    public class List
    {
     public class Query : IRequest<Result<List<VacationDto>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<VacationDto>>>
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
            public async Task<Result<List<VacationDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await _context.Vacations
                .ProjectTo<VacationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<VacationDto>>.Success(query);
            }
        }   
    }
}