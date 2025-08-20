package com.appdev.appdev.Controller;

import com.appdev.appdev.DTO.UserDTO;
import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Mapper.UserMapper;
import com.appdev.appdev.Model.User;
import com.appdev.appdev.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private  UserService userService;
    @Autowired
    private  UserMapper userMapper;

    // Only ADMIN can create a new user
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO dto) {
        User user = userMapper.toEntity(dto);
        return ResponseEntity.ok(userMapper.toDTO(userService.saveUser(user)));
    }

    // Only ADMIN or the user themselves can view their details
    @PreAuthorize("hasRole('ADMIN') or @authz.canAccessUserId(#id, authentication)")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(userMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }

    // ADMIN and MANAGER can view all users
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(
                userService.getAllUsers().stream()
                        .map(userMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    // ADMIN and MANAGER can view users by manager ID
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<UserDTO>> getUsersByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(
                userService.getUserByManagerId(managerId).stream()
                        .map(userMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    // Only ADMIN can delete a user
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
