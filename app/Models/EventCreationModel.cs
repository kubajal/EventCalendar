using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class EventCreationModel
    {
        public String eventId { get; set; }
        public String name { get; set; }
        public String description { get; set; }
        public DateTime date { get; set; }
    }
}
