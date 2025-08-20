package com.appdev.appdev.Repository;

import com.appdev.appdev.Model.LeaveRequest;
import com.appdev.appdev.Model.LeaveStatus;
import com.appdev.appdev.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    // Get all leave requests by a specific employee
    List<LeaveRequest> findByEmployee(User employee);
    List<LeaveRequest> findByUserId(Long userId);

    List<LeaveRequest> findByEmployeeId(Long userId);
    List<LeaveRequest> findByStatus(LeaveStatus status);
    List<LeaveRequest> findByApproverIdAndStatus(Long approverId, LeaveStatus status);

    // Manager: get leave requests of employees under them
    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.manager.id = :managerId")
    List<LeaveRequest> findByManagerId(Long managerId);

    // Admin: get leave requests of managers (for approval by admin)
    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.role = 'MANAGER'")
    List<LeaveRequest> findManagerLeaveRequests();
}
