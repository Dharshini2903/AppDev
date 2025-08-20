package com.appdev.appdev.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Correction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attendance_log_id")
    private AttendanceLog attendanceLog;

    @ManyToOne
    @JoinColumn(name = "corrected_by_user_id")
    private User correctedByUser;

    private String reason;
    private LocalDateTime oldCheckIn;
    private LocalDateTime newCheckIn;
    private LocalDateTime oldCheckOut;
    private LocalDateTime newCheckOut;

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceLog getAttendanceLog() {
        return attendanceLog;
    }
    public void setAttendanceLog(AttendanceLog attendanceLog) {
        this.attendanceLog = attendanceLog;
    }

    public User getCorrectedByUser() {
        return correctedByUser;
    }
    public void setCorrectedByUser(User correctedByUser) {
        this.correctedByUser = correctedByUser;
    }

    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getOldCheckIn() {
        return oldCheckIn;
    }
    public void setOldCheckIn(LocalDateTime oldCheckIn) {
        this.oldCheckIn = oldCheckIn;
    }

    public LocalDateTime getNewCheckIn() {
        return newCheckIn;
    }
    public void setNewCheckIn(LocalDateTime newCheckIn) {
        this.newCheckIn = newCheckIn;
    }

    public LocalDateTime getOldCheckOut() {
        return oldCheckOut;
    }
    public void setOldCheckOut(LocalDateTime oldCheckOut) {
        this.oldCheckOut = oldCheckOut;
    }

    public LocalDateTime getNewCheckOut() {
        return newCheckOut;
    }
    public void setNewCheckOut(LocalDateTime newCheckOut) {
        this.newCheckOut = newCheckOut;
    }
}
