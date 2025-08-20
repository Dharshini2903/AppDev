// package com.appdev.appdev.Controller;

// import com.appdev.appdev.DTO.LeaveRequestDTO;
// import com.appdev.appdev.Model.LeaveStatus;
// import com.appdev.appdev.Service.LeaveRequestService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/leaves")
// public class LeaveRequestController {

//     private final LeaveRequestService leaveRequestService;

//     public LeaveRequestController(LeaveRequestService leaveRequestService) {
//         this.leaveRequestService = leaveRequestService;
//     }

//     // Employee/Manager apply for leave
//     @PostMapping("/apply/{userId}")
//     public ResponseEntity<LeaveRequestDTO> applyLeave(@PathVariable Long userId,
//                                                       @RequestBody LeaveRequestDTO leaveRequestDTO) {
//         LeaveRequestDTO saved = leaveRequestService.applyLeave(userId, leaveRequestDTO);
//         return ResponseEntity.ok(saved);
//     }

//     // Manager/Admin approve/reject
//     @PutMapping("/{leaveId}/status")
//     public ResponseEntity<LeaveRequestDTO> updateLeaveStatus(@PathVariable Long leaveId,
//                                                              @RequestParam boolean approve) {
//         LeaveRequestDTO updated = leaveRequestService.approveOrRejectLeave(leaveId, approve);
//         return ResponseEntity.ok(updated);
//     }

//     // Get leaves by user
//     @GetMapping("/user/{userId}")
//     public ResponseEntity<List<LeaveRequestDTO>> getLeavesByUser(@PathVariable Long userId) {
//         List<LeaveRequestDTO> requests = leaveRequestService.getLeaveRequestsByUser(userId);
//         return ResponseEntity.ok(requests);
//     }

//     // Admin/Manager can view all pending leaves they need to handle
//     @GetMapping("/pending/{approverId}")
//     public ResponseEntity<List<LeaveRequestDTO>> getPendingLeaves(@PathVariable Long approverId) {
//         List<LeaveRequestDTO> requests = leaveRequestService.getPendingLeavesForApprover(approverId);
//         return ResponseEntity.ok(requests);
//     }
// }
// LeaveRequestController.java
package com.appdev.appdev.Controller;

import com.appdev.appdev.DTO.LeaveRequestDTO;
import com.appdev.appdev.Security.CustomUserDetails;
import com.appdev.appdev.Service.LeaveRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // Employee/Manager apply for leave
    @PostMapping("/apply/{userId}")
    public ResponseEntity<LeaveRequestDTO> applyLeave(@PathVariable Long userId,
                                                      @RequestBody LeaveRequestDTO leaveRequestDTO) {
        LeaveRequestDTO saved = leaveRequestService.applyLeave(userId, leaveRequestDTO);
        return ResponseEntity.ok(saved);
    }

    // Manager/Admin approve/reject (uses logged-in user as approver)
    @PutMapping("/{leaveId}/status")
    public ResponseEntity<LeaveRequestDTO> updateLeaveStatus(@PathVariable Long leaveId,
                                                            @RequestParam boolean approve) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long approverId = userDetails.getId();

        LeaveRequestDTO updated = leaveRequestService.approveOrRejectLeave(leaveId, approverId, approve);

                
        return ResponseEntity.ok(updated);
    }

    // Get leaves by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaveRequestDTO>> getLeavesByUser(@PathVariable Long userId) {
        List<LeaveRequestDTO> requests = leaveRequestService.getLeaveRequestsByUser(userId);
        return ResponseEntity.ok(requests);
    }

    // Admin/Manager can view all pending leaves they need to handle
    @GetMapping("/pending")
    public ResponseEntity<List<LeaveRequestDTO>> getPendingLeaves() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long approverId = userDetails.getId();

        List<LeaveRequestDTO> requests = leaveRequestService.getPendingLeavesForApprover(approverId);
        return ResponseEntity.ok(requests);
    }
}
