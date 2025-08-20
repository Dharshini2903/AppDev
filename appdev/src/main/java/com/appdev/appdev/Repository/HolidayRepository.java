package com.appdev.appdev.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.appdev.Model.Holiday;
import java.util.Optional;
import java.time.LocalDate;


public interface HolidayRepository extends JpaRepository<Holiday,Long>{
    Optional<Holiday> findByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
}