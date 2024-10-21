package com.example.bus_timetabling.service;

import com.example.bus_timetabling.utils.ValidTimesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ValidTimesValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTimes {
    String message() default "Departure time cannot be after arrival time";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
