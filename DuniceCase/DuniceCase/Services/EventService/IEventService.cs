using DuniceCase.Dtos.EventDtos;

namespace DuniceCase.Services.EventService
{
    public interface IEventService
    {
        Task<ServiceResponse<GetEventDto>> CreateOne(AddEventDto newEvent);
        Task<ServiceResponse<GetEventDto>> GetOne(int id);
        Task<ServiceResponse<List<GetEventDto>>> GetAll();
        Task<ServiceResponse<GetEventDto>> UpdateOne(int id, UpdateEventDto eventToUpdate);
        Task<ServiceResponse<List<GetEventDto>>> DeleteOne(int id);
    }
}
