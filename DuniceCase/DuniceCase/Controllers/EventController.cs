using DuniceCase.Dtos.EventDtos;
using DuniceCase.Services.EventService;
using Microsoft.AspNetCore.Mvc;

namespace DuniceCase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        public IEventService _eventService { get; set; }

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }
        [HttpPost]
        public async Task<ActionResult<GetEventDto>> CreateOne(AddEventDto newEvent)
        {
            return Ok(await _eventService.CreateOne(newEvent));
        }
        [HttpGet]
        public async Task<ActionResult<List<GetEventDto>>> GetAll() {
            return Ok(await _eventService.GetAll());

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GetEventDto>> GetOne(int id)
        {
            return Ok(await _eventService.GetOne(id));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<GetEventDto>>UpdateOne(int id, UpdateEventDto eventToUpdate)
        {
            return Ok(await _eventService.UpdateOne(id, eventToUpdate));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<GetEventDto>>>DeleteOne(int id)
        {
            return Ok(await _eventService.DeleteOne(id));
        }
        

    }
}
