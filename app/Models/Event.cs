using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public String Description { get; set; }
        [Required]
        public ApplicationUser Creator { get; set; }
        [Required]
        public List<ApplicationUserEvent> Subscribers { get; set; }
    }
}
