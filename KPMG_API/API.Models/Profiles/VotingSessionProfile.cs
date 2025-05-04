using API.Models.DTOs.VotingSession;
using API.Models.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                .ForMember(dest => dest.Description, src => src.MapFrom(e => e.Description));
        }
    }
}
