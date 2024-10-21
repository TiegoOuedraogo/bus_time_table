package com.example.bus_timetabling.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesTableDto {
    private Long id;
    private LocalDateTime departures;
    private LocalDateTime arrival;
    private Long busId;
    private Long stopId;
}

