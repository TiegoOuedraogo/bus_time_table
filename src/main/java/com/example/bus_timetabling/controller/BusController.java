package com.example.bus_timetabling.controller;

import com.example.bus_timetabling.dto.BusResponseDto;
import com.example.bus_timetabling.entities.Bus;
import com.example.bus_timetabling.service.BusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/buses")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping("/{id}")
    public BusResponseDto findBusById(@PathVariable("student-id") Long id) {
        return busService.findBusById(id);
    }

    @GetMapping("/{busNumber}")
    public List<BusResponseDto> findBusByNumber(@PathVariable("busNumber") String busNumber) {
        return busService.findBusByNumber(busNumber);
    }

    @GetMapping
    public List<BusResponseDto> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/{routeId}")
    public List<BusResponseDto> findBusByRouteId(@PathVariable("routeId") Long routeId) {
        return busService.findBusByRouteId(routeId);
    }
//
//    @GetMapping("/{stopId}")
//    public List<BusResponseDto> findBusByStopId(@PathVariable("stopId") Long stopId) {
//        return busService.findBusByStopId(stopId);
//    }


}
