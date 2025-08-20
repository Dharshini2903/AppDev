package com.appdev.appdev.Mapper;

import com.appdev.appdev.DTO.AttendanceLogDTO;
import com.appdev.appdev.Model.AttendanceLog;
import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
public class AttendanceLogMapper {

    @Autowired
    private UserRepository userRepository;

    // Convert entity to DTO
    public AttendanceLogDTO toDTO(AttendanceLog log) {
        if (log == null) return null;

        AttendanceLogDTO dto = new AttendanceLogDTO();
        dto.setId(log.getId());
        dto.setUserId(log.getUser() != null ? log.getUser().getId() : null);
        dto.setCheckInTime(log.getCheckInTime());
        dto.setCheckOutTime(log.getCheckOutTime());
        dto.setTotalHours(log.getTotalHours());
        dto.setIsCorrected(log.getIsCorrected());

        return dto;
    }

    // Convert DTO to entity
    public AttendanceLog toEntity(AttendanceLogDTO dto) {
        if (dto == null) return null;

        AttendanceLog log = new AttendanceLog();
        log.setId(dto.getId());

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            log.setUser(user);
        } else {
            log.setUser(null);
        }

        log.setCheckInTime(dto.getCheckInTime());
        log.setCheckOutTime(dto.getCheckOutTime());
        log.setTotalHours(dto.getTotalHours());
        log.setIsCorrected(dto.getIsCorrected() != null ? dto.getIsCorrected() : Boolean.FALSE);

        return log;
    }
}
