using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{UserName}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query{UserName = userName}));
        }

        [HttpGet("{UserName}/activities")]
        public async Task<IActionResult> GetUserActivities(string userName, string predicate)
        {
            return HandleResult(await Mediator.Send(new Application.Activities.ProfileActivityList.Query{UserName = userName, Predicate = predicate}));
        }
    }
}