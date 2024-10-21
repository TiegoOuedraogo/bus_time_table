package com.example.bus_timetabling.service;

import com.example.bus_timetabling.dto.TimesTableRequestDto;
import com.example.bus_timetabling.dto.TimesTableResponseDto;
import com.example.bus_timetabling.entities.Bus;
import com.example.bus_timetabling.entities.Stop;
import com.example.bus_timetabling.entities.TimesTable;
import com.example.bus_timetabling.repository.TimesTableRepository;
import com.example.bus_timetabling.repository.BusRepository;
import com.example.bus_timetabling.repository.StopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimesTableService {

    private final TimesTableRepository timesTableRepository;
    private final BusRepository busRepository;
    private final StopRepository stopRepository;

    public TimesTableService(TimesTableRepository timesTableRepository,
                             BusRepository busRepository,
                             StopRepository stopRepository) {
        this.timesTableRepository = timesTableRepository;
        this.busRepository = busRepository;
        this.stopRepository = stopRepository;
    }

    public List<TimesTableResponseDto> getAllTimesTables() {
        return timesTableRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public TimesTableResponseDto getTimesTableById(Long id) {
        TimesTable timesTable = timesTableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("TimesTable not found with id: " + id));
        return mapToResponseDto(timesTable);
    }

    public TimesTableResponseDto createTimesTable(TimesTableRequestDto requestDto) {
        Bus bus = busRepository.findById(requestDto.getBusId())
                .orElseThrow(() -> new IllegalArgumentException("Bus not found with id: " + requestDto.getBusId()));
        Stop stop = stopRepository.findById(requestDto.getStopId())
                .orElseThrow(() -> new IllegalArgumentException("Stop not found with id: " + requestDto.getStopId()));

        TimesTable timesTable = new TimesTable();
        timesTable.setDepartures(requestDto.getDepartures());
        timesTable.setArrival(requestDto.getArrival());
        timesTable.setBus(bus);
        timesTable.setStop(stop);

        TimesTable savedTimesTable = timesTableRepository.save(timesTable);
        return mapToResponseDto(savedTimesTable);
    }

    public void deleteTimesTable(Long id) {
        TimesTable timesTable = timesTableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("TimesTable not found with id: " + id));
        timesTableRepository.deleteById(id);
    }


    public List<TimesTableResponseDto> getTimesTablesByBusId(Long busId) {
        return timesTableRepository.findByBusId(busId)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public List<TimesTableResponseDto> getTimesTablesByStopId(Long stopId) {
        return timesTableRepository.findByStopId(stopId)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public TimesTableResponseDto updateTimesTable(Long id, TimesTableRequestDto requestDto) {
        TimesTable existing = timesTableRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("TimesTable not found with id: " + id));

        existing.setDepartures(requestDto.getDepartures());
        existing.setArrival(requestDto.getArrival());

        Bus bus = busRepository.findById(requestDto.getBusId())
                .orElseThrow(() -> new IllegalArgumentException("Bus not found with id: " + requestDto.getBusId()));
        Stop stop = stopRepository.findById(requestDto.getStopId())
                .orElseThrow(() -> new IllegalArgumentException("Stop not found with id: " + requestDto.getStopId()));

        existing.setBus(bus);
        existing.setStop(stop);

        TimesTable updated = timesTableRepository.save(existing);
        return mapToResponseDto(updated);
    }

    private TimesTableResponseDto mapToResponseDto(TimesTable timesTable) {
        TimesTableResponseDto responseDto = new TimesTableResponseDto();
        responseDto.setId(timesTable.getId());
        responseDto.setDepartures(timesTable.getDepartures());
        responseDto.setArrival(timesTable.getArrival());
        responseDto.setBusId(timesTable.getBus().getId());
        responseDto.setBusNumber(timesTable.getBus().getBusNumber());
        responseDto.setStopId(timesTable.getStop().getId());
        responseDto.setStopName(timesTable.getStop().getStopName());
        responseDto.calculateJourneyDuration();
        return responseDto;
    }
}
