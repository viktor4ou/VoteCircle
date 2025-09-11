using API.Models.DTOs.Authentication;
using API.Models.DTOs.Enitity;
using API.Models.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
