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
        public VotingSession(int id, string title, string description, DateTime scheduledUntil,DateTime createdOn)
        {
            Id = id;
            Title = title;
            Description = description;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
        }
        public VotingSession(string title, DateTime scheduledUntil, DateTime createdOn)
        {
            Title = title;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
            
        }

        public VotingSession(string title, string? description, DateTime scheduledUntil, DateTime createdOn, decimal result, bool isActive)
        {
            Title = title;
            Description = description;
            ScheduledUntil = scheduledUntil;
            CreatedOn = createdOn;
            Result = result;
            IsActive = isActive;
        }

        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime ScheduledUntil { get; set; }
        public DateTime CreatedOn { get; set; }
        public decimal Result { get; set; }
        public bool IsActive { get; set; } 

        public IEnumerable<Entity> Entities = new List<Entity>();
    }
}
