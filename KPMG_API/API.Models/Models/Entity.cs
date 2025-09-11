using System.ComponentModel.DataAnnotations;

namespace API.Models.Models
{
    public class Entity
    {
        public Entity()
        {

        }
        public Entity(int id, string ownerId, string title, decimal percentageWeight, int sessionId)
        {
            Id = id;
            OwnerId = ownerId;
            Title = title;
            PercentageWeight = percentageWeight;
            VotingSessionId = sessionId;
        }
        public Entity(string title, string ownerId, decimal percentageWeight, int sessionId)
        {
            Title = title;
            OwnerId = ownerId;
            PercentageWeight = percentageWeight;
            VotingSessionId = sessionId;
        }
        public Entity(string title, string ownerId, decimal percentageWeight)
        {
            Title = title;
            OwnerId = ownerId;
            PercentageWeight = percentageWeight;
        }

        [Key]
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public string Title { get; set; }
        public decimal PercentageWeight { get; set; }
        public int VotingSessionId { get; set; }
        public VotingSession Session { get; set; } = null!;

    }
}
