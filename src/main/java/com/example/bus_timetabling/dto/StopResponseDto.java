package com.example.bus_timetabling.dto;

import com.example.bus_timetabling.entities.Route;
import com.example.bus_timetabling.entities.TimesTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StopResponseDto {
    private Long id;
    private String stopName;
    private Route route;
    private List<TimesTable> timesTables = new ArrayList<>();
}
