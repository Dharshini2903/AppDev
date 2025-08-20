package com.appdev.appdev.Security;

import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("authz")

public class AuthzService {
    @Autowired
    private  UserRepository userRepository;

    /** Returns true if the authenticated user can access the given userId */
    public boolean canAccessUserId(Long userId, Authentication auth) {
        if (auth == null) return false;

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isManager = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_MANAGER"));
        if (isAdmin || isManager) return true;

        // EMPLOYEE: only self
        String email = auth.getName();
        User me = userRepository.findByEmail(email).orElse(null);
        return me != null && me.getId().equals(userId);
    }
}
