package com.igorszalas.fitDiet.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.UserRepository;

import io.jsonwebtoken.Claims;

@Component
public class JWTGenerator {
    @Autowired
    private UserRepository userRepository;

    long JWTexpiration = 70000000;
    String JWTSecret = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2";

    public User fetchUserData(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Error("User problem");
        }
    }

    public String generateJWTToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWTexpiration);
        // Instant currentTime = Instant.now();
        // Date expireDate = new Date(currentTime.plusMillis(JWTexpiration *
        // 1000).toEpochMilli());
        User user = this.fetchUserData(username);
        Map<String, Object> claims = new TreeMap<>();
        claims.put("UserID", user.getId());
        claims.put("Role", user.getUserType());
        claims.put("Email", user.getEmail());
        claims.put("Profile photo", user.getProfilePhoto());

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS512, JWTSecret)
                .compact();
        System.out.println("TOKEN" + token);
        return token;
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(JWTSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            System.out.println("        TOKEN TESTER        " + token + "               ");
            Jwts.parser().setSigningKey(JWTSecret).parseClaimsJws(token);
            return true;
        } catch (Exception exception) {
            throw new AuthenticationCredentialsNotFoundException("JWT incorrect!");
        }
    }
}
