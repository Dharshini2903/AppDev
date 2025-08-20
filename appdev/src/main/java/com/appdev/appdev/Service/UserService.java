// UserService.java
package com.appdev.appdev.Service;

import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;

    // public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    //     this.userRepository = userRepository;
    //     this.passwordEncoder = passwordEncoder;
    // }

    // // Register user
    // public User registerUser(User user) {
    //     if (userRepository.existsByEmail(user.getEmail())) {
    //         throw new RuntimeException("Email is already registered!");
    //     }

    //     // Encode password before saving
    //     user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

    //     // Default role if not set
    //     if (user.getRole() == null || user.getRole().isEmpty()) {
    //         user.setRole("ROLE_USER");
    //     }

    //     return userRepository.save(user);
    // }

    // // Find by email
    // public Optional<User> findByEmail(String email) {
    //     return userRepository.findByEmail(email);
    // }



    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Self-registration
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }
        return userRepository.save(user);
    }

    // Admin create / update
    public User saveUser(User user) {
        if (user.getPasswordHash() != null) {
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        }
        return userRepository.save(user);
    }

    // Find by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Find by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // List all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // List users by manager
    public List<User> getUserByManagerId(Long managerId) {
        return userRepository.findByManagerId(managerId);
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    

}
