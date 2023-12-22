
using DuniceCase.Dtos.EventDtos;
using DuniceCase.Entities.Event;
using Microsoft.Extensions.Hosting;

namespace DuniceCase
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<Event, GetEventDto>();
            CreateMap<AddEventDto, Event>();
            CreateMap<UpdateEventDto, Event>();
            CreateMap<Post, GetPostDto>();
            CreateMap<AddPostDto, Post>();
            CreateMap<UpdatePostDto, Post>();
        }
    }
}
