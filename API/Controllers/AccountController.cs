//controller to manage user acunts deriving from ControllerBase rather then from BaseApiController to keep the 
//identity login seperate from the rest. aditionally we are going to use a token here.
using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController: ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokentService _tokentService;
        public AccountController(UserManager<AppUser> userManager, TokentService tokentService)
        {   
            _tokentService = tokentService;
            _userManager = userManager;   
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user , loginDto.Password);
            if (result){
                return new UserDto{
                    DisplayName = user.DislplayName,
                    Image = null,
                    Token = _tokentService.CreateToken(user),
                    UserName = user.UserName
                };
            }
            return Unauthorized();
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("this Email is assosiated with an existing account");
            }
            var user = new AppUser {
                DislplayName = registerDto.DisplayName,
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user , registerDto.Password);
            if(result.Succeeded)
            {
                return CreatNewUser(user);
            }
            return BadRequest(result.Errors);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreatNewUser(user);
        }
         private UserDto CreatNewUser(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DislplayName,
                UserName = user.UserName,
                Image = null,
                Token = _tokentService.CreateToken(user)
            };
        }
    }
}