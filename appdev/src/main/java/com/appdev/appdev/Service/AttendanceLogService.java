package com.appdev.appdev.Service;

import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Model.AttendanceLog;
import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.AttendanceLogRepository;
import com.appdev.appdev.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class AttendanceLogService {
    @Autowired
    private  AttendanceLogRepository attendanceLogRepository;
    @Autowired
    private  UserRepository userRepository;

    public AttendanceLog checkIn(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        AttendanceLog log = new AttendanceLog();
        log.setUser(user);
        log.setCheckInTime(LocalDateTime.now());
        log.setIsCorrected(Boolean.FALSE);

        return attendanceLogRepository.save(log);
    }


    public AttendanceLog checkOut(Long userId) {
        AttendanceLog openLog = attendanceLogRepository
                .findTopByUserIdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No open attendance log for user " + userId));

        openLog.setCheckOutTime(LocalDateTime.now());

        if (openLog.getCheckInTime() != null && openLog.getCheckOutTime() != null) {
            long minutes = java.time.Duration.between(openLog.getCheckInTime(), openLog.getCheckOutTime()).toMinutes();
            openLog.setTotalHours(java.math.BigDecimal
                    .valueOf(minutes / 60.0)
                    .setScale(2, java.math.RoundingMode.HALF_UP));
        }
        return attendanceLogRepository.save(openLog);
    }

    public List<AttendanceLog> getLogsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        return attendanceLogRepository.findByUserId(userId);
    }

    public List<AttendanceLog> findLogsByDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        return attendanceLogRepository.findByUserIdAndCheckInTimeBetween(userId, start, end);
    }
}
