package com.example.bus_timetabling.utils;

import com.example.bus_timetabling.service.ValidTimes;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import com.example.bus_timetabling.dto.TimesTableRequestDto;

public class ValidTimesValidator implements ConstraintValidator<ValidTimes, TimesTableRequestDto> {

    @Override
    public boolean isValid(TimesTableRequestDto dto, ConstraintValidatorContext context) {
        if (dto.getDepartures() == null || dto.getArrival() == null) {
            return true;
        }
        return !dto.getDepartures().isAfter(dto.getArrival());
    }
}
