using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class ApplicationUserEvent
    {
        public Event Event { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public int EventId { get; set; }
        public string Id { get; set; }
    }
}
