﻿using Microsoft.AspNetCore.Identity;

namespace API.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
