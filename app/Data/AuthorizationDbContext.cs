using app.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Data
{
    public class AuthorizationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public AuthorizationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            this.Database.Migrate();
        }
        public DbSet<ApplicationUser> DotNetUsers { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ApplicationUserEvent>()
                .HasKey(bc => new { bc.EventId, bc.Id});
            modelBuilder.Entity<ApplicationUserEvent>()
                .HasOne(bc => bc.Event)
                .WithMany(b => b.Subscribers)
                .HasForeignKey(bc => bc.EventId);
            modelBuilder.Entity<ApplicationUserEvent>()
                .HasOne(bc => bc.ApplicationUser)
                .WithMany(b => b.Subscriptions)
                .HasForeignKey(bc => bc.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
