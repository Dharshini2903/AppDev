package com.appdev.appdev.Mapper;

import com.appdev.appdev.DTO.LeaveRequestDTO;
import com.appdev.appdev.Model.LeaveRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LeaveRequestMapper {

    LeaveRequestMapper INSTANCE = Mappers.getMapper(LeaveRequestMapper.class);

    // Entity -> DTO
    @Mapping(source = "employee.id", target = "employeeId")
     @Mapping(source = "approver.id", target = "approverId")   // ✅ map approver

    LeaveRequestDTO toDTO(LeaveRequest leaveRequest);

    // DTO -> Entity
    @Mapping(source = "employeeId", target = "employee.id")
    @Mapping(source = "approverId", target = "approver.id")   // ✅ map approver


    LeaveRequest toEntity(LeaveRequestDTO leaveRequestDTO);
}
