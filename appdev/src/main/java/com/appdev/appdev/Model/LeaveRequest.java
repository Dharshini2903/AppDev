package com.appdev.appdev.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
     @Enumerated(EnumType.STRING)
    private LeaveStatus status;   

    @ManyToOne
@JoinColumn(name = "approver_id")
private User approver;

public User getApprover() {
    return approver;
}

public void setApprover(User approver) {
    this.approver = approver;
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee;

    public LeaveStatus getStatus() {
        return status;
    }

    public void setStatus(LeaveStatus status) {
        this.status = status;
    }

    // getters and setters
}


    