package com.appdev.appdev.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.appdev.Model.Correction;

public interface CorrectionRepository extends JpaRepository<Correction,Long>{
    List<Correction>findByAttendanceLogId(long attendanceLogId);
}