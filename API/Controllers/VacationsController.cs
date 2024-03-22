using Application.Vacations;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class VacationsController: BaseApiController
    {
        [HttpGet] // get a list of all vacations
        public async Task<ActionResult<List<Vacation>>> GetVcations()
        {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }
        [HttpGet("{id}")] //get the activities of a spesific vacation based on id
        public async Task<IActionResult> GetVacation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost] //creat new vacation
        public async Task<IActionResult> CreateVacation(Vacation vacation)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Vacation = vacation})); 
        }

        [HttpPut("{id}")] //edite existing vacation
        public async Task<IActionResult> EditVacation(Guid id , Vacation vacation)
        {
            vacation.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Vacation = vacation}));
        }

        [HttpDelete("{id}")] // delete vacation
        public async Task<IActionResult> DeleteVacation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}