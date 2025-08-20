package com.appdev.appdev.DTO;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AttendanceLogDTO {

    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private BigDecimal totalHours;
    private Boolean isCorrected;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalDateTime checkInTime) { this.checkInTime = checkInTime; }

    public LocalDateTime getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(LocalDateTime checkOutTime) { this.checkOutTime = checkOutTime; }

    public BigDecimal getTotalHours() { return totalHours; }
    public void setTotalHours(BigDecimal totalHours) { this.totalHours = totalHours; }

    public Boolean getIsCorrected() { return isCorrected; }
    public void setIsCorrected(Boolean isCorrected) { this.isCorrected = isCorrected; }
}
