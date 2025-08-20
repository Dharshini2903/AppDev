package com.appdev.appdev.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String role; // USER, ADMIN, etc.
    
    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash; // only store the hash

    @Transient // not saved to DB, only used for input
    private String password;

    // Getter and Setter for id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for role
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    // Getter and Setter for manager
    public User getManager() {
        return manager;
    }
    public void setManager(User manager) {
        this.manager = manager;
    }

    


    // Getter and Setter for passwordHash
    public String getPasswordHash() {
        return passwordHash;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // Getter and Setter for password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
