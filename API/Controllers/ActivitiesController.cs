using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController: BaseApiController
    {
       
        [HttpGet] //get spesific activity based on id
        public async Task<ActionResult<List<Activity>>> GetActivities([FromQuery]ActivityParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }
        [HttpGet("{id}")] //get spesific activity based on id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost] //creat new activity
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity})); 
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")] //edite existing activity
        public async Task<IActionResult> EditActivity(Guid id , Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete ("{id}")] // delete activity
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")] // updates the users attendence of the activity, makes it the oposit
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}