using System.ComponentModel;
using DuniceCase.Dtos.EventDtos;
using DuniceCase.Entities.Event;

namespace DuniceCase.Services.EventService
{
    public class EventService : IEventService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public EventService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetEventDto>> CreateOne(AddEventDto newEvent)
        {
            var serviceResponse = new ServiceResponse<GetEventDto>();
            var _event = _mapper.Map<Event>(newEvent);
            _context.Events.Add(_event);
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<GetEventDto>(_event);
            serviceResponse.Success = true;
            serviceResponse.Message = "Event successfully created";
            return serviceResponse;

        }
        public async Task<ServiceResponse<List<GetEventDto>>> GetAll()
        {
            var serviceResponse = new ServiceResponse<List<GetEventDto>>();
            var _events = await _context.Events.ToListAsync();
            serviceResponse.Data = _events.Select(c => _mapper.Map<GetEventDto>(c)).ToList();
            serviceResponse.Success = true;
            serviceResponse.Message = "Events received successfully";
            return serviceResponse;
        }
        public async Task<ServiceResponse<GetEventDto>> GetOne(int id)
        {
            var serviceResponse = new ServiceResponse<GetEventDto>();
            try
            {
                var _event = await _context.Events.FindAsync(id) ?? throw new Exception($"Event with Id:{id} not found.");
                serviceResponse.Data = _mapper.Map<GetEventDto>(_event);
                serviceResponse.Success = true;
                serviceResponse.Message = "Event received successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
        public async Task<ServiceResponse<GetEventDto>> UpdateOne(int id, UpdateEventDto eventToUpdate)
        {
            var serviceResponse = new ServiceResponse<GetEventDto>();
            try
            {
                var _updatedEvent = await _context.Events.FindAsync(id) ?? throw new Exception($"Event with Id:{id} not found.");

                foreach (var property in typeof(UpdateEventDto).GetProperties())
                {
                    var updatedValue = property.GetValue(eventToUpdate);
                    if (updatedValue != null && !string.IsNullOrEmpty(updatedValue.ToString()))
                    {
                        var eventProperty = _updatedEvent.GetType().GetProperty(property.Name);
                        eventProperty.SetValue(_updatedEvent, updatedValue);
                    }
                }
                _context.Events.Update(_updatedEvent);
                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetEventDto>(_updatedEvent);
                serviceResponse.Success = true;
                serviceResponse.Message = "Event successfully updated.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
        public async Task<ServiceResponse<List<GetEventDto>>> DeleteOne(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetEventDto>>();
            try
            {
                var _event = await _context.Events.FindAsync(id) ?? throw new Exception($"Event with Id{id} not found.");
                _context.Events.Remove(_event);
                await _context.SaveChangesAsync();
                var _events = await _context.Events.ToListAsync();
                serviceResponse.Data = _events.Select(c => _mapper.Map<GetEventDto>(c)).ToList();
                serviceResponse.Success = true;
                serviceResponse.Message = "Events successfully deleted.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}
