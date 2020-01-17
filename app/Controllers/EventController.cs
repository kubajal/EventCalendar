using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace app.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private static readonly string[] EventNames = new[]
        {
            "Event 1", "Event 2", "Event 3", "Event 4", "Event 5", "Event 6"
        };
        private static readonly string[] EventDescriptions = new[]
        {
            "Description 1", "Description 2", "Description 3", "Description 4", "Description 5", "Description 6"
        };

        private readonly ILogger<EventController> _logger;
        private AuthorizationDbContext DbContext;

        public EventController(ILogger<EventController> logger, AuthorizationDbContext dbContext)
        {
            _logger = logger;
            this.DbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return DbContext.Events.ToArray();
            //var x = Enumerable.Range(0, 5).Select(index => new Event
            //{
            //    Id = index,
            //    Name = EventNames[index],
            //    Description = EventDescriptions[index]
            //})
            //.ToArray();
            //return x;
        }
        [HttpPost]
        public void Post(Event e)
        {
            DbContext.Events.Add(e);
            DbContext.SaveChanges();
        }
    }
}
