using API.Models.DTOs.Enitity;
using API.Models.Models;
using AutoMapper;

namespace API.Models.Profiles
{
    public class EntityProfile : Profile
    {
        public EntityProfile()
        {
            CreateMap<CreateEntityDTO, Entity>()
                .ForMember(dest => dest.Title, src => src.MapFrom(e => e.Title))
                .ForMember(dest => dest.VotingSessionId, src => src.MapFrom(e => e.SessionId))
                .ForMember(dest => dest.PercentageWeight, src => src.MapFrom(e => e.PercentageWeight))
                .ForMember(dest => dest.OwnerId, opt => opt.MapFrom((src, dest, destMember, context) =>
                            context.Items["UserId"]));

            CreateMap<EditEntityDTO, Entity>()
                //.ForMember(dest => dest.Id, src => src.MapFrom(e => e.Id))
                .ForMember(dest => dest.PercentageWeight, src => src.MapFrom(e => e.PercentageWeight))
                .ForMember(dest => dest.Title, src => src.MapFrom(e => e.Title));




        }
    }
}
