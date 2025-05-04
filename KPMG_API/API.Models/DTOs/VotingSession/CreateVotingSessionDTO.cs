using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.DTOs.VotingSession
{
    public class CreateVotingSessionDTO
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public DateTime ScheduledUntil { get; set; }
    }
}
