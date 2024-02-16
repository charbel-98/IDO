using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    public class RegistrationRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
