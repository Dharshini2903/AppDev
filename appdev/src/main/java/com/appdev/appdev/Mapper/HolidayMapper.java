// package com.appdev.appdev.Mapper;

// import org.mapstruct.Mapper;
// import com.appdev.appdev.Model.Holiday;
// import com.appdev.appdev.DTO.HolidayDTO;

// @Mapper(componentModel = "spring")
// public interface HolidayMapper {
//     HolidayDTO toDTO(Holiday holiday);
//     Holiday toEntity(HolidayDTO dto);
// }

package com.appdev.appdev.Mapper;

import com.appdev.appdev.DTO.HolidayDTO;
import com.appdev.appdev.Model.Holiday;
import org.springframework.stereotype.Component;

@Component
public class HolidayMapper {

    public HolidayDTO toDTO(Holiday holiday) {
        if (holiday == null) return null;

        HolidayDTO dto = new HolidayDTO();
        dto.setId(holiday.getId());
        dto.setName(holiday.getName());
        dto.setDate(holiday.getDate());

        return dto;
    }

    public Holiday toEntity(HolidayDTO dto) {
        if (dto == null) return null;

        Holiday holiday = new Holiday();
        holiday.setId(dto.getId());
        holiday.setName(dto.getName());
        holiday.setDate(dto.getDate());

        return holiday;
    }
}
