using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public String FirstName;
        [Required]
        public String LastName;
        [Required]
        public String asdf;
        [Required]
        public DateTime TimeRegistered;

        public void SetFirstName(String _firstName)
        {
            this.FirstName = _firstName;
        }
        public void SetLastName(String _lastName)
        {
            this.LastName = _lastName;
        }
        public ApplicationUser(int _id, String firstName, String lastName, DateTime timeRegistered)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.TimeRegistered = DateTime.Now;
        }
        public ApplicationUser()
        {
        }
    }
}
