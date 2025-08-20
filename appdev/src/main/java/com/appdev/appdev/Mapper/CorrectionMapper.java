// package com.appdev.appdev.Mapper;

// import org.mapstruct.Mapper;
// import org.mapstruct.Mapping;
// import com.appdev.appdev.Model.Correction;
// import com.appdev.appdev.DTO.CorrectionDTO;

// @Mapper(componentModel = "spring")
// public interface CorrectionMapper {

//     @Mapping(source = "attendanceLog.id", target = "attendanceLogId")
//     CorrectionDTO toDTO(Correction correction);

//     @Mapping(source = "attendanceLogId", target = "attendanceLog.id")
//     Correction toEntity(CorrectionDTO dto);
// }

package com.appdev.appdev.Mapper;

import com.appdev.appdev.DTO.CorrectionDTO;
import com.appdev.appdev.Model.Correction;
import com.appdev.appdev.Model.AttendanceLog;
import com.appdev.appdev.Repository.AttendanceLogRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CorrectionMapper {

    @Autowired
    private  AttendanceLogRepository attendanceLogRepository;

    public CorrectionDTO toDTO(Correction correction) {
        if (correction == null) return null;

        CorrectionDTO dto = new CorrectionDTO();
        dto.setId(correction.getId());
        dto.setAttendanceLogId(correction.getAttendanceLog() != null ? correction.getAttendanceLog().getId() : null);
        dto.setReason(correction.getReason());
        // dto.setApproved(correction.getApproved());

        return dto;
    }

    public Correction toEntity(CorrectionDTO dto) {
        if (dto == null) return null;

        Correction correction = new Correction();
        correction.setId(dto.getId());

        if (dto.getAttendanceLogId() != null) {
            AttendanceLog log = attendanceLogRepository.findById(dto.getAttendanceLogId()).orElse(null);
            correction.setAttendanceLog(log);
        } else {
            correction.setAttendanceLog(null);
        }

        correction.setReason(dto.getReason());
        // correction.setApproved(dto.getApproved());

        return correction;
    }
}
