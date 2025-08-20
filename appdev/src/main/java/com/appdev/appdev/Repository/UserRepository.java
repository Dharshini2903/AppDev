// UserRepository.java
package com.appdev.appdev.Repository;

import com.appdev.appdev.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByManagerId(Long managerId);
    @Query("select u from User u where u.role = 'MANAGER'")
    List<User> findAllManagers();
}
