package com.appdev.appdev.Service;

import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Model.Correction;
import com.appdev.appdev.Repository.CorrectionRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service

@Transactional
public class CorrectionService {
    @Autowired
    private  CorrectionRepository correctionRepository;

    public Correction saveCorrection(Correction correction) {
        return correctionRepository.save(correction);
    }

    public List<Correction> getAllCorrection() {
        return correctionRepository.findAll();
    }

    public List<Correction> getCorrectionsByAttendanceLogId(Long logId) {
        return correctionRepository.findByAttendanceLogId(logId);
    }

    public Optional<Correction> getCorrectionById(Long id) {
    return correctionRepository.findById(id);
}
}
