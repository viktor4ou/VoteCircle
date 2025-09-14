using API.Models.DTOs.VotingSession;
using API.Models.Models;
using AutoMapper;

namespace API.Models.Profiles
{
    public class VotingSessionProfile : Profile
    {
        public VotingSessionProfile()
        {
            CreateMap<CreateVotingSessionDTO, VotingSession>()
                .ForMember(dest => dest.IsActive, src => src.MapFrom(e => false))
                .ForMember(dest => dest.Result, src => src.MapFrom(e => 0.0m))
                .ForMember(dest => dest.CreatedOn, src => src.MapFrom(e => DateTime.UtcNow))
                .ForMember(dest => dest.ScheduledUntil, src => src.MapFrom(e => e.ScheduledUntil))
                .ForMember(dest => dest.Description, src => src.MapFrom(e => e.Description))
                .ForMember(dest => dest.OwnerId, opt => opt.MapFrom((src, dest, destMember, context) =>
                            context.Items["UserId"]));
        }
    }
}
