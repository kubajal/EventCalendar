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
            if (e == null)
                return NotFound(
                    new CRUDResponse
                    {
                        IsSuccess = false,
                        Message = "Event with ID " + eventId + " was not found"
                    });
            DbContext.Entry(e).Reference(p => p.Creator).Load();
            var currentUser = GetCurrentUser();
            if (
                // creator of this event has been deleted from the db
                e.Creator == null 
                // user which is trying to deleted the event does not have permissions
                || e.Creator.Id != currentUser.Id)
                return Unauthorized(
                    new CRUDResponse
                    {
                        IsSuccess = false,
                        Message = "You do not have permissions to delete event with id " + eventId
                    });
            DbContext.Events.Remove(e);
            DbContext.SaveChanges();
            return Ok(new CRUDResponse
            {
                IsSuccess = true,
                Message = "Event has been deleted"
            }) ;
        }
        [HttpPost]
        public object PostAsync(EventCreationModel e)
        {
            ApplicationUser CurrentUser = GetCurrentUser();
            Event newEvent = null;

            try
            {
                if (DbContext.Events.Count() == 0)
                {
                    newEvent = new Event()
                    {
                        EventId = 1,
                        Description = e.description,
                        Name = e.name,
                        Subscribers = new List<ApplicationUserEvent>(),
                        Creator = CurrentUser
                    };
                }
                else
                {
                    newEvent = new Event()
                    {
                        EventId = DbContext.Events.Max(e => e.EventId) + 1,
                        Description = e.description,
                        Name = e.name,
                        Subscribers = new List<ApplicationUserEvent>(),
                        Creator = CurrentUser
                    };
                }
            }
            catch(Exception ex)
            {
                return new CRUDResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }
            DbContext.Events.Add(newEvent);
            DbContext.SaveChanges();
            return new CRUDResponse
            {
                IsSuccess = true,
                Message = newEvent.EventId.ToString()
            };
        }

        private ApplicationUser GetCurrentUser()
        {
            var UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return DbContext.DotNetUsers.FirstOrDefault(e => e.Id == UserId);
        }
    }
}
