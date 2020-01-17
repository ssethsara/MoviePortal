using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace MoviePortal.shared
{
    public class JWTAuthServices
    {
        public static String JwtTokenGenerate(){
            var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("secret key for jwt"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
 
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5001",
                audience: "http://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials
            );
 
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;

        }
    }
}