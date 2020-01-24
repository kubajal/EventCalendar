using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using System.Data.Common;

namespace app.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        public AuthorizationDbContext DbContext { get; }

        public AttendanceController(AuthorizationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        // GET: api/Attendance

        [HttpGet]
        public IEnumerable<object> Get()
        {
            ApplicationUser User = GetCurrentUser();
            return DbContext.ApplicationUserEvents
                .Include(e => e.ApplicationUser)
                .Where(e => e.ApplicationUser.Id == User.Id)
                .Include(e => e.Event)
                .Select(e => new
                {
                    eventId = e.Event.EventId,
                    eventName = e.Event.Name
                })
                .ToArray();
        }
        [HttpPost]
        public CRUDResponse PostAsync([FromBody]int id)
        {
            ApplicationUser CurrentUser = GetCurrentUser();
            Event Event = null;
            if(DbContext.ApplicationUserEvents.FirstOrDefault(e => e.EventId == id && CurrentUser.Id == e.Id) != null)
                return new CRUDResponse
                {
                    IsSuccess = true,
                    Message = "User " + CurrentUser.Id + " already attends event with the ID " + id
                };
            try
            {
                Event = DbContext.Events.FirstOrDefault(e => e.EventId == id);
            }
            catch (DbException ex)
            {
                return new CRUDResponse
                {
                    IsSuccess = false,
                    Message = "Could not find event with ID " + id + ". " + ex.Message
                };
            }

            DbContext.ApplicationUserEvents
                .Add(new ApplicationUserEvent()
                {
                    Event = Event,
                    EventId = id,
                    ApplicationUser = CurrentUser,
                    Id = "1"
                });
            DbContext.SaveChanges();
            return new CRUDResponse
            {
                IsSuccess = true,
                Message = "User " + CurrentUser.Id + " attends event " + Event.EventId
            };
        }

        [HttpDelete]
        public IActionResult Delete(int eventId)
        {
            ApplicationUser CurrentUser = GetCurrentUser();
            ApplicationUserEvent aue = DbContext
                .ApplicationUserEvents
                .Where(e => e.Id == CurrentUser.Id && e.EventId == eventId)
                .FirstOrDefault();
            if (aue == null)
                return NotFound(
                    new CRUDResponse
                    {
                        IsSuccess = false,
                        Message = "User" + CurrentUser.Id + " does not attend event with the ID " + eventId
                    });
            DbContext.Entry(aue).Reference(p => p.Event).Load();
            var currentUser = GetCurrentUser();
            DbContext.ApplicationUserEvents.Remove(aue);
            DbContext.SaveChanges();
            return Ok(new CRUDResponse
            {
                IsSuccess = true,
                Message = "User " + CurrentUser.Id + " does not longer attend the event " + aue.EventId
            });
        }

        private ApplicationUser GetCurrentUser()
        {
            var UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return DbContext.DotNetUsers.FirstOrDefault(e => e.Id == UserId);
        }
    }
}
