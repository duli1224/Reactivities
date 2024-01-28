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
    }
}