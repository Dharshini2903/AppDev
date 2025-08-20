package com.appdev.appdev.Service;

import com.appdev.appdev.DTO.LeaveRequestDTO;
import com.appdev.appdev.Mapper.LeaveRequestMapper;
import com.appdev.appdev.Model.LeaveRequest;
import com.appdev.appdev.Model.LeaveStatus;
import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.LeaveRequestRepository;
import com.appdev.appdev.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
        private final UserRepository userRepository;

    private final LeaveRequestMapper leaveRequestMapper;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository,UserRepository userRepository, LeaveRequestMapper leaveRequestMapper) {
        this.leaveRequestRepository = leaveRequestRepository;
                this.userRepository = userRepository;

        this.leaveRequestMapper = leaveRequestMapper;
    }

    // ✅ Apply for leave

public LeaveRequestDTO applyLeave(Long employeeId, LeaveRequestDTO dto) {
    User employee = userRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    LeaveRequest leave = leaveRequestMapper.toEntity(dto);
    leave.setEmployee(employee);

    // ✅ Determine approver logic
    if ("EMPLOYEE".equals(employee.getRole())) {
        User manager = employee.getManager();
        if (manager == null) {
            throw new RuntimeException("Manager not assigned for this employee");
        }
        leave.setApprover(manager);

    } else if ("MANAGER".equals(employee.getRole())) {
        User admin = userRepository.findAll().stream()
                .filter(u -> "ADMIN".equals(u.getRole()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        leave.setApprover(admin);
    }

    leave.setStatus(LeaveStatus.PENDING);
    LeaveRequest saved = leaveRequestRepository.save(leave);

    return leaveRequestMapper.toDTO(saved); // ✅ map back to DTO
}


    public LeaveRequestDTO approveOrRejectLeave(Long leaveId, Long approverId, boolean approve) {
        LeaveRequest leave = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        User approver = userRepository.findById(approverId)
                .orElseThrow(() -> new RuntimeException("Approver not found"));

        User employee = leave.getEmployee();

        // 🔹 Role-based validation
        if ("EMPLOYEE".equals(employee.getRole())) {
            // Only MANAGER can approve/reject employee leave
            if (!"MANAGER".equals(approver.getRole())) {
                throw new RuntimeException("Only MANAGER can approve/reject employee leave");
            }
        } else if ("MANAGER".equals(employee.getRole())) {
            // Only ADMIN can approve/reject manager leave
            if (!"ADMIN".equals(approver.getRole())) {
                throw new RuntimeException("Only ADMIN can approve/reject manager leave");
            }
        }

        leave.setApprover(approver);
        leave.setStatus(approve ? LeaveStatus.APPROVED : LeaveStatus.REJECTED);

        LeaveRequest updated = leaveRequestRepository.save(leave);
        return leaveRequestMapper.toDTO(updated);
    }

    // ✅ Get leaves by user
    public List<LeaveRequestDTO> getLeaveRequestsByUser(Long employeeId) {
    return leaveRequestRepository.findByEmployeeId(employeeId).stream()
            .map(leaveRequestMapper::toDTO)
            .collect(Collectors.toList());
}

    // ✅ Get pending leaves for manager/admin
    public List<LeaveRequestDTO> getPendingLeavesForApprover(Long approverId) {
        return leaveRequestRepository.findByApproverIdAndStatus(approverId, LeaveStatus.PENDING)
                .stream()
                .map(leaveRequestMapper::toDTO)
                .collect(Collectors.toList());
    }
    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }
}
