
package com.appdev.appdev.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.appdev.Model.AttendanceLog;

public interface AttendanceLogRepository extends JpaRepository<AttendanceLog,Long> {
    List<AttendanceLog> findByUserId(Long userId);
    List<AttendanceLog> findByUserManagerId(Long managerId);
    List<AttendanceLog> findByUserIdAndCheckInTimeBetween(Long userId, LocalDateTime start, LocalDateTime end);
    Optional<AttendanceLog> findTopByUserIdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(Long userId);
}
