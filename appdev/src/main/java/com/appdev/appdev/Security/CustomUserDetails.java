package com.appdev.appdev.Security;

import com.appdev.appdev.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId(); // This is what you need as approverId
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Convert roles as needed
        return user.getRole() == null ? 
            java.util.List.of() : 
            java.util.List.of(() -> "ROLE_" + user.getRole().toUpperCase());
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
