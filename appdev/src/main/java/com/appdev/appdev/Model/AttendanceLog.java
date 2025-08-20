// package com.appdev.appdev.Model;

// import jakarta.persistence.*;
// import lombok.*;
// import java.math.BigDecimal;
// import java.time.LocalDateTime;

// @Entity
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class AttendanceLog {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "user_id")
//     private User user;

//     private LocalDateTime checkInTime;

//     private LocalDateTime checkOutTime;

//     private BigDecimal totalHours;

//     @Column(nullable = false)
//     private Boolean isCorrected = Boolean.FALSE;
// }
package com.appdev.appdev.Model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class AttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private BigDecimal totalHours;

    @Column(nullable = false)
    private Boolean isCorrected = Boolean.FALSE;

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }
    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }
    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public BigDecimal getTotalHours() {
        return totalHours;
    }
    public void setTotalHours(BigDecimal totalHours) {
        this.totalHours = totalHours;
    }

    public Boolean getIsCorrected() {
        return isCorrected;
    }
    public void setIsCorrected(Boolean isCorrected) {
        this.isCorrected = isCorrected;
    }
}
