using API.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Data.Interfaces
{
    public interface IVotingSessionRepository : IRepository<VotingSession>
    {
        public Task<VotingSession> GetSessionById(int id);
    }
}
