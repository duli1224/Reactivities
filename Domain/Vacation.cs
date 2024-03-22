namespace Domain
{
    public class Vacation
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public ICollection<Activity> Activities {get; set;} = new List<Activity>();
        public string HostUserName { get; set; }
    }
}