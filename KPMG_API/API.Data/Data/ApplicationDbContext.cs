using API.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Data.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Entity> Entities { get; set; }
        public DbSet<VotingSession> VotingSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<VotingSession>()
                .HasMany(e => e.Entities)
                .WithOne(e => e.Session)
                .HasForeignKey(e => e.VotingSessionId)
                .IsRequired();

            modelBuilder.Entity<Entity>()
                .Property(e => e.PercentageWeight)
                .HasColumnType("decimal(18,2)");

            // Seed Entities
            modelBuilder.Entity<Entity>()
                .HasData(
                    new Entity(1, "Change roof", 5.2m, 1),
                    new Entity(2, "New water pipe", 3.6m, 1)
                );

            // Use a static DateTime instead of DateTime.UtcNow
            var staticDate = new DateTime(2025, 3, 24, 21, 33, 37, DateTimeKind.Utc);

            // Seed VotingSession
            modelBuilder.Entity<VotingSession>()
                .HasData(
                    new VotingSession(1,"New water pipe", "We need to change the water pipe", staticDate , staticDate)
                );
        }

    }
}
