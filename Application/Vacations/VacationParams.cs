using Application.Core;

namespace Application.Vacations
{
    public class VacationParams: PagingParams
    {
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

    }
}