// AuthController.java
package com.appdev.appdev.Controller;

import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;
import com.appdev.appdev.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // adjust if frontend runs elsewhere
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Encode the plain password into passwordHash
        user.setPasswordHash(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(user);
    }
}
