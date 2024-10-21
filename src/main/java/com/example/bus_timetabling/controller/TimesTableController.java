package com.example.bus_timetabling.controller;

import com.example.bus_timetabling.dto.TimesTableRequestDto;
import com.example.bus_timetabling.dto.TimesTableResponseDto;
import com.example.bus_timetabling.service.TimesTableService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/timetables")
public class TimesTableController {

    private final TimesTableService timesTableService;

    public TimesTableController(TimesTableService timesTableService) {
        this.timesTableService = timesTableService;
    }

    @PostMapping
    public TimesTableResponseDto createTimesTable(@Valid @RequestBody TimesTableRequestDto requestDto) {
        return timesTableService.createTimesTable(requestDto);
    }

    @PutMapping("/{id}")
    public TimesTableResponseDto updateTimesTable(
            @PathVariable Long id, @Valid @RequestBody TimesTableRequestDto requestDto) {
        return timesTableService.updateTimesTable(id, requestDto);
    }

    @GetMapping
    public List<TimesTableResponseDto> getAllTimesTables() {
        return timesTableService.getAllTimesTables();
    }

    @GetMapping("/{id}")
    public TimesTableResponseDto getTimesTableById(@PathVariable Long id) {
        return timesTableService.getTimesTableById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTimesTable(@PathVariable Long id) {
        timesTableService.deleteTimesTable(id);
    }

    @GetMapping("/bus/{busId}")
    public List<TimesTableResponseDto> getTimesTablesByBusId(@PathVariable Long busId) {
        return timesTableService.getTimesTablesByBusId(busId);
    }

    @GetMapping("/stop/{stopId}")
    public List<TimesTableResponseDto> getTimesTablesByStopId(@PathVariable Long stopId) {
        return timesTableService.getTimesTablesByStopId(stopId);
    }
}
