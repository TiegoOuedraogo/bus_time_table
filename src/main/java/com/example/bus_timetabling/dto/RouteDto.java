package com.example.bus_timetabling.dto;

import com.example.bus_timetabling.entities.Bus;
import com.example.bus_timetabling.entities.Stop;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteDto {
    private Long id;
    private String routeName;
    private String routeOrigin;
    private String destination;
    private Double distance;
    private List<Stop> stops = new ArrayList<>();
    private List<Bus> buses = new ArrayList<>();

}
