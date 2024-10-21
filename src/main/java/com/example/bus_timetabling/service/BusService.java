package com.example.bus_timetabling.service;

import com.example.bus_timetabling.dto.BusDto;
import com.example.bus_timetabling.dto.BusResponseDto;
import com.example.bus_timetabling.mapper.BusMapper;
import com.example.bus_timetabling.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusService {

    private final BusRepository busRepo;
    private final BusMapper busMapper;

    public BusService(BusRepository busRepo, BusMapper busMapper) {
        this.busRepo = busRepo;
        this.busMapper = busMapper;
    }

    public BusResponseDto findBusById(Long id) {
        return busRepo.findById(id).map(busMapper::toBusResponseDTO).orElse(null);
    }

    public List<BusResponseDto> findBusByNumber(String busNumber) {
        return busRepo.findByBusNumber(busNumber).stream().map(busMapper::toBusResponseDTO).collect(Collectors.toList());
    }

    public List<BusResponseDto> getAllBuses() {
        return busRepo.findAll().stream().map(busMapper::toBusResponseDTO).collect(Collectors.toList());
    }

    public List<BusResponseDto> findBusByRouteId(Long routeId) {
        return busRepo.findBusByRouteId(routeId).stream().map(busMapper::toBusResponseDTO).collect(Collectors.toList());
    }

//    public List<BusResponseDto> findBusByStopId(Long stopId) {
//        return busRepo.findBusByStopId(stopId).stream().map(busMapper::toBusResponseDTO).collect(Collectors.toList());
//    }
}
