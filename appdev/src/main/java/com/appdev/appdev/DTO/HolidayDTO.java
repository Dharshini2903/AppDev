package com.appdev.appdev.DTO;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class HolidayDTO {

    private Long id;

    @NotBlank(message = "Holiday name is required")
    private String name;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Holiday date must be today or in the future")
    private LocalDate date;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
}
