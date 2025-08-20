package com.appdev.appdev.Controller;

import com.appdev.appdev.DTO.CorrectionDTO;
import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Mapper.CorrectionMapper;
import com.appdev.appdev.Model.Correction;
import com.appdev.appdev.Repository.AttendanceLogRepository;
import com.appdev.appdev.Repository.UserRepository;
import com.appdev.appdev.Service.CorrectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/corrections")
public class CorrectionController {
    @Autowired
    private  CorrectionService correctionService;
    @Autowired
    private  CorrectionMapper correctionMapper;
    @Autowired
    private  AttendanceLogRepository attendanceLogRepository;
    @Autowired
    private  UserRepository userRepository;

    // Employees can create corrections only for their own logs
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping
    public ResponseEntity<CorrectionDTO> createCorrection(@Valid @RequestBody CorrectionDTO dto,
                                                          Authentication auth) {
        var log = attendanceLogRepository.findById(dto.getAttendanceLogId())
                .orElseThrow(() -> new ResourceNotFoundException("Attendance log not found: " + dto.getAttendanceLogId()));

        var me = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));

        if (!log.getUser().getId().equals(me.getId())) {
            return ResponseEntity.status(403).build();
        }

        Correction correction = correctionMapper.toEntity(dto);
        correction.setCorrectedByUser(me);
        return ResponseEntity.ok(correctionMapper.toDTO(correctionService.saveCorrection(correction)));
    }

    // Managers and Admins can view all corrections
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    @GetMapping
    public ResponseEntity<List<CorrectionDTO>> getAllCorrections() {
        return ResponseEntity.ok(
                correctionService.getAllCorrection().stream()
                        .map(correctionMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    // Managers and Admins can view corrections for a specific log
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    @GetMapping("/log/{logId}")
    public ResponseEntity<List<CorrectionDTO>> getByAttendanceLog(@PathVariable Long logId) {
        return ResponseEntity.ok(
                correctionService.getCorrectionsByAttendanceLogId(logId).stream()
                        .map(correctionMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    // Managers and Admins can view correction details
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CorrectionDTO> getCorrectionById(@PathVariable Long id) {
        return correctionService.getCorrectionById(id)
                .map(correctionMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Correction not found with ID: " + id));
    }
}
