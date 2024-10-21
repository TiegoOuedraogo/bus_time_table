package com.example.bus_timetabling.dto;

import com.example.bus_timetabling.service.ValidTimes;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@ValidTimes
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesTableRequestDto {

    @NotNull(message = "Departure time cannot be null")
    private LocalDateTime departures;

    @NotNull(message = "Arrival time cannot be null")
    private LocalDateTime arrival;

    @NotNull(message = "Bus ID cannot be null")
    private Long busId;

    @NotNull(message = "Stop ID cannot be null")
    private Long stopId;
}
