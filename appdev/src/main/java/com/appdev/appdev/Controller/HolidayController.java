package com.appdev.appdev.Controller;

import com.appdev.appdev.DTO.HolidayDTO;
import com.appdev.appdev.Exception.ResourceNotFoundException;
import com.appdev.appdev.Mapper.HolidayMapper;
import com.appdev.appdev.Model.Holiday;
import com.appdev.appdev.Service.HolidayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/holidays")
public class HolidayController {
    @Autowired
    private  HolidayService holidayService;
    @Autowired
    private  HolidayMapper holidayMapper;

    // Only ADMIN can create a holiday
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<HolidayDTO> createHoliday(@Valid @RequestBody HolidayDTO dto) {
        Holiday holiday = holidayMapper.toEntity(dto);
        return ResponseEntity.ok(holidayMapper.toDTO(holidayService.saveHoliday(holiday)));
    }

    // All authenticated users can view holidays
    @PreAuthorize("hasAnyRole('EMPLOYEE','MANAGER','ADMIN')")
    @GetMapping
    public ResponseEntity<List<HolidayDTO>> getAllHolidays() {
        return ResponseEntity.ok(
                holidayService.getAllHolidays().stream()
                        .map(holidayMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    // All authenticated users can view holiday by date
    @PreAuthorize("hasAnyRole('EMPLOYEE','MANAGER','ADMIN')")
    @GetMapping("/date/{date}")
    public ResponseEntity<HolidayDTO> getHolidayByDate(@PathVariable String date) {
        return holidayService.getHolidayByDate(LocalDate.parse(date))
                .map(holidayMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("No holiday found for date: " + date));
    }

    // Only ADMIN can delete a holiday
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long id) {
        holidayService.deleteHoliday(id);
        return ResponseEntity.noContent().build();
    }
}
