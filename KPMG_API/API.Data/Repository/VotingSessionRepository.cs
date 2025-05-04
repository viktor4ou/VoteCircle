using API.Data.Data;
using API.Data.Interfaces;
using API.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Data.Repository
{
    public class VotingSessionRepository : Repository<VotingSession>, IVotingSessionRepository
    {
        public VotingSessionRepository(ApplicationDbContext db)
            : base(db)
        {

        }

        public async Task<VotingSession> GetSessionById(int id)
        {
            return await set.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
