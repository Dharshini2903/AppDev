package com.appdev.appdev.Security;

import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private  UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // @Override
    // public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    //     User user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

    //     return org.springframework.security.core.userdetails.User.builder()
    //             .username(user.getEmail())
    //             .password(user.getPasswordHash()) // already encoded
    //             .authorities(mapRoles(user.getRole()))
    //             .build();
    // }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new CustomUserDetails(user); // return your custom user details
    }

    /**
     * Converts role string(s) to Spring Security ROLE_ format.
     * Supports single role like "ADMIN" or multiple comma-separated roles.
     */
    private Collection<? extends GrantedAuthority> mapRoles(String roleString) {
        if (roleString == null || roleString.isBlank()) {
            return Arrays.asList(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
        }
        return Arrays.stream(roleString.split(","))
                .map(String::trim)
                .filter(r -> !r.isEmpty())
                .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r.toUpperCase())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
