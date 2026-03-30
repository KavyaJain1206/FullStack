package com.AML_3A.JWTAuth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AML_3A.JWTAuth.security.JwtUtil;

@Service
public class AuthService {

 
    @Autowired
    private JwtUtil jwtUtil;

    public String login(String username, String password) {

        if (username.equals("admin") && password.equals("admin")) {
            return jwtUtil.generateToken(username);
        }

        return "Invalid Credentials";
    }
}