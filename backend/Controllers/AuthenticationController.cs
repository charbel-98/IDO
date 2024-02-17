using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using TodoApi.Configurations;
using TodoApi.Data;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly TodoApiDbContext _context;
        public AuthenticationController(UserManager<IdentityUser> userManager, IConfiguration configuration, TodoApiDbContext context, TokenValidationParameters tokenValidationParameters)
        {
            _userManager = userManager;
            _configuration = configuration ;
            _context = context;
            _tokenValidationParameters = tokenValidationParameters;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResult
                {
                    Errors = new List<string> { "Invalid payload" },
                    Success = false
                });
            }

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return BadRequest(new AuthResult
                {
                    Errors = new List<string> { "Email already in use" },
                    Success = false
                });
            }

            var newUser = new IdentityUser() { Email = request.Email, UserName = request.Email };
            var isCreated = await _userManager.CreateAsync(newUser, request.Password);
            if (isCreated.Succeeded)
            {
                var jwtToken = GenerateToken(newUser);
                return Ok(jwtToken);
            }
            else
            {
                return BadRequest(new AuthResult
                {
                    Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                    Success = false
                });
            }
        }
        
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResult
                {
                    Errors = new List<string> { "Invalid payload" },
                    Success = false
                });
            }

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser == null)
            {
                return BadRequest(new AuthResult
                {
                    Errors = new List<string> { "Invalid email" },
                    Success = false
                });
            }

            var isCorrect = await _userManager.CheckPasswordAsync(existingUser, request.Password);
            if (!isCorrect)
            {
                return BadRequest(new AuthResult
                {
                    Errors = new List<string> { "Invalid password" },
                    Success = false
                });
            }

            var jwtToken =await GenerateToken(existingUser);
            SetRefreshToken(jwtToken.RefreshToken);
            return Ok(jwtToken);
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequest request)
        {
            var refreshToken = Request.Cookies["refreshToken"];
            //print the refreshToken in console;
            Console.WriteLine("---------------->" + refreshToken);
            if (refreshToken == null)
            {
                return Unauthorized(new AuthResult
                {
                    Errors = new List<string> { "Invalid token" },
                    Success = false
                });
            }
            var jwtToken = await VerifyAndGenerateToken(request , refreshToken);
            if (!jwtToken.Success)
            {
                return Unauthorized(jwtToken);
            }
            SetRefreshToken(jwtToken.RefreshToken);
            return Ok(jwtToken);
        }
        private async Task<AuthResult> GenerateToken (IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection(key:"JwtConfig:Secret").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
                }),
                Expires = DateTime.UtcNow.Add(TimeSpan.Parse(_configuration.GetSection("JwtConfig:ExpiryTimeFrame").Value)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken= jwtTokenHandler.WriteToken(token);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                IsUsed = false,
                IsRevoked = false,
                Token = RandomStringGenerator(25)
            };
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
            return  new AuthResult
            {
                Success = true,
                Token = jwtToken,
                RefreshToken = refreshToken.Token,
                Email = user.Email
            };
        }
        private string RandomStringGenerator(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz_";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        private async Task<AuthResult> VerifyAndGenerateToken(TokenRequest request, string refreshToken)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            try
            {
                jwtTokenHandler.ValidateToken(request.Token, _tokenValidationParameters, out var validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                if (jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    var userId = jwtToken.Claims.First(x => x.Type == "Id").Value;
                    var user = await _userManager.FindByIdAsync(userId);
                    var storedToken = _context.RefreshTokens.FirstOrDefault(x => x.Token == refreshToken && x.UserId == userId);
                    if (storedToken == null)
                    {
                        return new AuthResult
                        {
                            Success = false,
                            Errors = new List<string> { "Invalid refresh token" }
                        };
                    }
                    if(DateTime.UtcNow > storedToken.ExpiryDate){
                        return new AuthResult
                        {
                            Success = false,
                            Errors = new List<string> { "Token has expired, user needs to relogin" }
                        };
                    }
                    if (storedToken.IsUsed)
                    {
                        return new AuthResult
                        {
                            Success = false,
                            Errors = new List<string> { "Token has been used" }
                        };
                    }
                    if (storedToken.IsRevoked)
                    {
                        return new AuthResult
                        {
                            Success = false,
                            Errors = new List<string> { "Token has been revoked" }
                        };
                    }
                    var jti = jwtToken.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                    if (storedToken.JwtId != jti)
                    {
                        return new AuthResult
                        {
                            Success = false,
                            Errors = new List<string> { "Token doesn't match" }
                        };
                    }
                    storedToken.IsUsed = true;
                    _context.RefreshTokens.Update(storedToken);
                    await _context.SaveChangesAsync();
                    return await GenerateToken(user);
                }
                else
                {
                    return new AuthResult
                    {
                        Success = false,
                        Errors = new List<string> { "Invalid token" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "here" }
                };
            }
        }
        private void SetRefreshToken(string refreshToken)
        {
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMonths(6)
            });
        }
    }}
        