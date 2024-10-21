package com.example.bus_timetabling.dto;

import com.example.bus_timetabling.entities.Route;
import com.example.bus_timetabling.entities.TimesTable;
import com.example.bus_timetabling.enums.Service;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusDto{
    private Long id;
    private String busNumber;
    private Integer capacity;
    private Service status;
    private List<TimesTable> timesTables = new ArrayList<TimesTable>();
    private Route route;
}
