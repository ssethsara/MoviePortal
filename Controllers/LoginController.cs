using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using MoviePortal.Models;
using MoviePortal.shared;
using Serilog;

namespace MoviePortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MovieContext _context;

        public LoginController(MovieContext context)
        {
            _context = context;
        }

       /* [HttpPost("[action]")]
        public IActionResult Login([FromBody] LoginModel userdata) {
        if(userdata != null) {
            var alreadySaved = _context.LoginModel.Where(Uid => Uid.Id == userdata.Id).FirstOrDefault();
            if (ModelState.IsValid) {
                if(alreadySaved != null) {
                    return Ok(new  {message="User data has been saved already!"});
                    }
                var user = new LoginModel {
                Id = userdata.Id,
                        FirstName = userdata.FirstName,
                        LastName = userdata.LastName,
                        PictureUrl = userdata.PictureUrl,
                        EmailAddress = userdata.EmailAddress,
                        Provider = userdata.Provider
                };
                _context.Add(user);
                _context.SaveChanges();
                return Ok(new  {  message="User Login successful" });
                }
            }

            var errors = ModelState.Values.First().Errors;
            return BadRequest(new JsonResult(errors));
            
        }*/


         [HttpPost]
        public IActionResult Login([FromBody] LoginModel userdata) {


                var log = new LoggerConfiguration()
                        .WriteTo.Console()
                        .CreateLogger();

                 if(userdata != null) {
                    //SimpleLogger.Log("userView = " + userView.tokenId);
                    var payload = GoogleJsonWebSignature.ValidateAsync(userdata.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                    //var user = await _authService.Authenticate(payload);
                   
                    var alreadySaved = _context.Login.Where(Uid => Uid.EmailAddress == userdata.EmailAddress).FirstOrDefault();
                    if (ModelState.IsValid && payload.EmailVerified==true) {
                            if(alreadySaved != null) {
                              log.Information("User already added");
                            }
                            else{
                                var user = new LoginModel {
                                        FirstName = userdata.FirstName,
                                        LastName = userdata.LastName,
                                        PictureUrl = userdata.PictureUrl,
                                        EmailAddress = userdata.EmailAddress,
                                        Provider = userdata.Provider
                                };
                                _context.Add(user);
                                _context.SaveChanges();
                            }
                            String jwtToken=JWTAuthServices.JwtTokenGenerate();
                            return Ok(
                                new  {  
                                    message="User Login successful",
                                    TokenJWT=jwtToken 
                                }
                            );
                        }
                        else if(payload.EmailVerified!=true){
                            return BadRequest(new JsonResult("TokenExpired"));
                        }
                }

                var errors = ModelState.Values.First().Errors;
                return BadRequest(new JsonResult(errors));

            
        }

        // GET: api/Login
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginModel>>> GetLoginModel()
        {
            return await _context.Login.ToListAsync();
        }

        // GET: api/Login/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginModel>> GetLoginModel(int id)
        {
            var loginModel = await _context.Login.FindAsync(id);

            if (loginModel == null)
            {
                return NotFound();
            }

            return loginModel;
        }

        // PUT: api/Login/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginModel(int id, LoginModel loginModel)
        {
            if (id != loginModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(loginModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Login
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
       /* [HttpPost]
        public async Task<ActionResult<LoginModel>> PostLoginModel(LoginModel loginModel)
        {
            _context.LoginModel.Add(loginModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LoginModelExists(loginModel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLoginModel", new { id = loginModel.Id }, loginModel);
        }*/

        // DELETE: api/Login/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LoginModel>> DeleteLoginModel(int id)
        {
            var loginModel = await _context.Login.FindAsync(id);
            if (loginModel == null)
            {
                return NotFound();
            }

            _context.Login.Remove(loginModel);
            await _context.SaveChangesAsync();

            return loginModel;
        }

        private bool LoginModelExists(int id)
        {
            return _context.Login.Any(e => e.Id == id);
        }
    }
}
