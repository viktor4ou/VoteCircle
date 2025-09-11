using API.Models.DTOs.Authentication;
using API.Models.Models;
using AutoMapper;

namespace API.Models.Profiles
{
    public class AuthenticationProfile : Profile
    {
        public AuthenticationProfile()
        {
            CreateMap<AuthenticationDTO, ApplicationUser>()
                .ForMember(dest => dest.Email, src => src.MapFrom(e => e.Email));
        }
    }
}
