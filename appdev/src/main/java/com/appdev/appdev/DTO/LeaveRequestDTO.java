package com.appdev.appdev.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
    public class LeaveRequestDTO {
    private Long id;
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
    public Long getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
    private Long approverId;

public Long getApproverId() {
    return approverId;
}

public void setApproverId(Long approverId) {
    this.approverId = approverId;
}
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private Long employeeId;   // ✅ matches entity.employee.id

    // getters and setters
}

