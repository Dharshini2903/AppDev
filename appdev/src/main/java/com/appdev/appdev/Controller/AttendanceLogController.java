package com.appdev.appdev.Controller;

import com.appdev.appdev.DTO.AttendanceLogDTO;
import com.appdev.appdev.Mapper.AttendanceLogMapper;
import com.appdev.appdev.Model.AttendanceLog;
import com.appdev.appdev.Service.AttendanceLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceLogController {
    private final AttendanceLogService attendanceLogService;
    private final AttendanceLogMapper attendanceLogMapper;

    @Autowired
    public AttendanceLogController(AttendanceLogService attendanceLogService, AttendanceLogMapper attendanceLogMapper) {
        this.attendanceLogService = attendanceLogService;
        this.attendanceLogMapper = attendanceLogMapper;
    }

    // @PreAuthorize("@authz.canAccessUserId(#userId, authentication)")
    @PostMapping("/checkin/{userId}")
    public ResponseEntity<AttendanceLogDTO> checkIn(@PathVariable Long userId) {
        AttendanceLog saved = attendanceLogService.checkIn(userId);
        return ResponseEntity.ok(attendanceLogMapper.toDTO(saved));
    }


    // @PreAuthorize("@authz.canAccessUserId(#dto.userId, authentication)")
        @PostMapping("/checkout/{userId}")
    public ResponseEntity<AttendanceLogDTO> checkOut(@PathVariable Long userId) {
        AttendanceLog saved = attendanceLogService.checkOut(userId);
        return ResponseEntity.ok(attendanceLogMapper.toDTO(saved));
    }
    // @PostMapping("/checkout")
    // public ResponseEntity<AttendanceLogDTO> checkOut(@Valid @RequestBody AttendanceLogDTO dto) {
    //     AttendanceLog saved = attendanceLogService.checkOut(dto.getUserId());
    //     return ResponseEntity.ok(attendanceLogMapper.toDTO(saved));
    // }

    @PreAuthorize("@authz.canAccessUserId(#userId, authentication)")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AttendanceLogDTO>> getUserLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(
                attendanceLogService.getLogsByUserId(userId).stream()
                        .map(attendanceLogMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    @PreAuthorize("@authz.canAccessUserId(#userId, authentication)")
    @GetMapping("/range")
    public ResponseEntity<List<AttendanceLogDTO>> getLogsInRange(
            @RequestParam Long userId,
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startTime = LocalDateTime.parse(start);
        LocalDateTime endTime = LocalDateTime.parse(end);
        return ResponseEntity.ok(
                attendanceLogService.findLogsByDateRange(userId, startTime, endTime).stream()
                        .map(attendanceLogMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }
}
