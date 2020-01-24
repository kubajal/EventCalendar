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

namespace app.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
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

        private ApplicationUser GetCurrentUser()
        {
            var UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return DbContext.DotNetUsers.FirstOrDefault(e => e.Id == UserId);
        }
    }
}
