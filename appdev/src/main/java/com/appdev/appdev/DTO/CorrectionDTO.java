package com.appdev.appdev.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CorrectionDTO {

    private Long id;

    @NotNull(message = "Attendance Log ID is required")
    private Long attendanceLogId;

    @NotBlank(message = "Reason is required")
    private String reason;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getAttendanceLogId() {
        return attendanceLogId;
    }
    public void setAttendanceLogId(Long attendanceLogId) {
        this.attendanceLogId = attendanceLogId;
    }

    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }
}
