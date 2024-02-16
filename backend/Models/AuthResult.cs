using Microsoft.Data.SqlClient;

namespace Models
{
    public class AuthResult
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
    }
}
