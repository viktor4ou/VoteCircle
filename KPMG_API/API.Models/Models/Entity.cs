using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.Models
{
    public class Entity
    {

        public Entity(int id, string title, decimal percentageWeight, int sessionId)
        {
            Id = id;
            Title = title;
            PercentageWeight = percentageWeight;
            VotingSessionId = sessionId;
        }
        public Entity(string title, decimal percentageWeight, int sessionId)
        {
            Title = title;
            PercentageWeight = percentageWeight;
            VotingSessionId = sessionId;
        }
        public Entity(string title, decimal percentageWeight)
        {
            Title = title;
            PercentageWeight = percentageWeight;
        }

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        
        public decimal PercentageWeight { get; set; }

        public int VotingSessionId { get; set; }
        public VotingSession Session { get; set; } = null!;

    }
}
