package com.example.bus_timetabling.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.time.Duration;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesTableResponseDto {
    private Long id;
    private LocalDateTime departures;
    private LocalDateTime arrival;
    private Long busId;
    private String busNumber;
    private Long stopId;
    private String stopName;
    private Duration journeyDuration;

    public void calculateJourneyDuration() {
        if (departures != null && arrival != null) {
            this.journeyDuration = Duration.between(departures, arrival);
        }
    }
}