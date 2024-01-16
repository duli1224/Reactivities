using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email {get; set;}
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$", ErrorMessage = "Password must contain an upper and a lower case letter and a number, between 8 and 15 characters")]
        public string Password {get; set;}
        [Required]
        public string DisplayName {get; set;}
        [Required]
        public string UserName {get; set;}
    }
}