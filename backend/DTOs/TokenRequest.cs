using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    public class TokenRequest
    {
        [Required]
        public string Token  { get; set; }
        
    }
}