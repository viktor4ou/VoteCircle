using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.Models
{
    public class VotingSession
    {
        public VotingSession()
        {
            
        }
        public VotingSession(int id, string ownerId, string title, string description, DateTime scheduledUntil, DateTime createdOn)
        {
            Id = id;
            OwnerId = ownerId;
            Title = title;
            Description = description;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
        }
        public VotingSession(string title, string ownerId, DateTime scheduledUntil, DateTime createdOn)
        {
            Title = title;
            OwnerId = ownerId;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
        }

        public VotingSession(string title, string ownerId, string? description, DateTime scheduledUntil, DateTime createdOn, decimal result, bool isActive)
        {
            Title = title;
            OwnerId = ownerId;
            Description = description;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
            Result = result;
            IsActive = isActive;
        }

        [Key]
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime ScheduledUntil { get; set; }
        public DateTime CreatedOn { get; set; }
        public decimal Result { get; set; }
        public bool IsActive { get; set; } 

        public IEnumerable<Entity> Entities = new List<Entity>();
    }
}
