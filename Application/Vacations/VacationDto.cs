using Application.Activities;
using Domain;

namespace Application.Vacations
{
    public class VacationDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string HostUserName {get; set;}
    }
}