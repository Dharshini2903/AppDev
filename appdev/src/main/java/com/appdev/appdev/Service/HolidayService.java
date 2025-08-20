package com.appdev.appdev.Service;

import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Model.Holiday;
import com.appdev.appdev.Repository.HolidayRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service

@Transactional
public class HolidayService {
    @Autowired
    private  HolidayRepository holidayRepository;

    public Holiday saveHoliday(Holiday holiday) {
        if (holidayRepository.findByDate(holiday.getDate()).isPresent()) {
            throw new IllegalArgumentException("Holiday already exists on date: " + holiday.getDate());
        }
        return holidayRepository.save(holiday);
    }

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public Optional<Holiday> getHolidayByDate(LocalDate date) {
    return holidayRepository.findByDate(date);
}

    public void deleteHoliday(Long id) {
        if (!holidayRepository.existsById(id)) {
            throw new ResourceNotFoundException("Holiday not found with ID: " + id);
        }
        holidayRepository.deleteById(id);
    }
}
