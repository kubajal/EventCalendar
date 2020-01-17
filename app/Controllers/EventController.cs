using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.Entity;

namespace app.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<EventController> Logger;
        private AuthorizationDbContext DbContext;
        private UserManager<ApplicationUser> UserManager;
        public IHttpContextAccessor HttpContextAccessor;

        public EventController(ILogger<EventController> logger,
            AuthorizationDbContext dbContext,
            UserManager<ApplicationUser> manager,
            IHttpContextAccessor httpContextAccessor)
        {
            this.Logger = logger;
            this.DbContext = dbContext;
            this.UserManager = manager;
            this.HttpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            return DbContext.Events
                .Select(e => new {
                    description = e.Description,
                    name = e.Name,
                    eventId = e.EventId,
                })
                .ToArray();
        }

        [HttpDelete]
        public IActionResult Delete(String eventId)
        {
            int id = int.Parse(eventId);
            Event e = DbContext
                .Events
                .Include(e => e.Creator)
                .Where(e => e.EventId == id)
                .FirstOrDefault();
            DbContext.Entry(e).Reference(p => p.Creator).Load();
            if (e == null)
                return NotFound("Event with ID " + eventId + " was not found");
            var currentUser = GetCurrentUser();
            if (e.Creator.Id != currentUser.Id)
                return Unauthorized("Event with ID " + eventId + " cant be deleted by user " + e.Creator.Id.ToString());
            DbContext.Events.Remove(e);
            DbContext.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public void PostAsync(EventCreationModel e)
        {
            ApplicationUser CurrentUser = GetCurrentUser();

            if (DbContext.Events.Count() == 0)
            {
                DbContext.Events.Add(new Event()
                {
                    EventId = 1,
                    Description = e.description,
                    Name = e.name,
                    Subscribers = new List<ApplicationUserEvent>(),
                    Creator = CurrentUser
                });
            }
            else
            {
                DbContext.Events.Add(new Event()
                {
                    EventId = DbContext.Events.Max(e => e.EventId) + 1,
                    Description = e.description,
                    Name = e.name,
                    Subscribers = new List<ApplicationUserEvent>(),
                    Creator = CurrentUser
                });
            }
            DbContext.SaveChanges();
        }

        private ApplicationUser GetCurrentUser()
        {
            var UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return DbContext.DotNetUsers.FirstOrDefault(e => e.Id == UserId);
        }
    }
}
