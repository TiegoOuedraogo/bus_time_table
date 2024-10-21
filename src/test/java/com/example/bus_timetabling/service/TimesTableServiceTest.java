package com.example.bus_timetabling.service;

import com.example.bus_timetabling.dto.TimesTableRequestDto;
import com.example.bus_timetabling.dto.TimesTableResponseDto;
import com.example.bus_timetabling.entities.Bus;
import com.example.bus_timetabling.entities.Stop;
import com.example.bus_timetabling.entities.TimesTable;
import com.example.bus_timetabling.repository.BusRepository;
import com.example.bus_timetabling.repository.StopRepository;
import com.example.bus_timetabling.repository.TimesTableRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TimesTableServiceTest {

    @Mock
    private TimesTableRepository timesTableRepository;

    @Mock
    private BusRepository busRepository;

    @Mock
    private StopRepository stopRepository;

    @InjectMocks
    private TimesTableService timesTableService;

    private Bus validBus;
    private Stop validStop;
    private TimesTable validTimesTable;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        validBus = new Bus();
        validBus.setId(1L);

        validStop = new Stop();
        validStop.setId(2L);

        validTimesTable = new TimesTable();
        validTimesTable.setId(1L);
        validTimesTable.setDepartures(LocalDateTime.of(2024, 10, 14, 8, 0));
        validTimesTable.setArrival(LocalDateTime.of(2024, 10, 14, 10, 0));
        validTimesTable.setBus(validBus);
        validTimesTable.setStop(validStop);
    }

    @Test
    void getAllTimesTables() {
        when(timesTableRepository.findAll()).thenReturn(List.of(validTimesTable));

        List<TimesTableResponseDto> result = timesTableService.getAllTimesTables();

        assertEquals(1, result.size());
        assertEquals(validTimesTable.getDepartures(), result.get(0).getDepartures());
        verify(timesTableRepository, times(1)).findAll();
    }

    @Test
    void getTimesTableById() {
        when(timesTableRepository.findById(1L)).thenReturn(Optional.of(validTimesTable));

        TimesTableResponseDto result = timesTableService.getTimesTableById(1L);

        assertNotNull(result);
        assertEquals(validTimesTable.getDepartures(), result.getDepartures());
        verify(timesTableRepository, times(1)).findById(1L);
    }

    @Test
    void getTimesTableById_NotFound() {
        when(timesTableRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                timesTableService.getTimesTableById(1L));

        assertEquals("TimesTable not found with id: 1", exception.getMessage());
        verify(timesTableRepository, times(1)).findById(1L);
    }

    @Test
    void createTimesTable() {
        TimesTableRequestDto requestDto = new TimesTableRequestDto(
                LocalDateTime.of(2024, 10, 14, 8, 0),
                LocalDateTime.of(2024, 10, 14, 10, 0),
                1L, 2L
        );

        when(busRepository.findById(1L)).thenReturn(Optional.of(validBus));
        when(stopRepository.findById(2L)).thenReturn(Optional.of(validStop));
        when(timesTableRepository.save(any(TimesTable.class))).thenReturn(validTimesTable);

        TimesTableResponseDto result = timesTableService.createTimesTable(requestDto);

        assertNotNull(result);
        assertEquals(validTimesTable.getDepartures(), result.getDepartures());
        verify(timesTableRepository, times(1)).save(any(TimesTable.class));
    }

    @Test
    void deleteTimesTable() {
        when(timesTableRepository.findById(1L)).thenReturn(Optional.of(validTimesTable));
        doNothing().when(timesTableRepository).deleteById(1L);

        timesTableService.deleteTimesTable(1L);

        verify(timesTableRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteTimesTable_NotFound() {
        when(timesTableRepository.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                timesTableService.deleteTimesTable(1L));

        assertEquals("TimesTable not found with id: 1", exception.getMessage());
        verify(timesTableRepository, times(0)).deleteById(1L);
    }


    @Test
    void getTimesTablesByBusId() {
        when(timesTableRepository.findByBusId(1L)).thenReturn(List.of(validTimesTable));

        List<TimesTableResponseDto> result = timesTableService.getTimesTablesByBusId(1L);

        assertEquals(1, result.size());
        assertEquals(validTimesTable.getDepartures(), result.get(0).getDepartures());
        verify(timesTableRepository, times(1)).findByBusId(1L);
    }

    @Test
    void getTimesTablesByStopId() {
        when(timesTableRepository.findByStopId(2L)).thenReturn(List.of(validTimesTable));

        List<TimesTableResponseDto> result = timesTableService.getTimesTablesByStopId(2L);

        assertEquals(1, result.size());
        assertEquals(validTimesTable.getDepartures(), result.get(0).getDepartures());
        verify(timesTableRepository, times(1)).findByStopId(2L);
    }

    @Test
    void updateTimesTable() {
        TimesTableRequestDto requestDto = new TimesTableRequestDto(
                LocalDateTime.of(2024, 10, 14, 9, 0),
                LocalDateTime.of(2024, 10, 14, 11, 0),
                1L, 2L
        );

        when(timesTableRepository.findById(1L)).thenReturn(Optional.of(validTimesTable));
        when(busRepository.findById(1L)).thenReturn(Optional.of(validBus));
        when(stopRepository.findById(2L)).thenReturn(Optional.of(validStop));
        when(timesTableRepository.save(any(TimesTable.class))).thenReturn(validTimesTable);

        TimesTableResponseDto result = timesTableService.updateTimesTable(1L, requestDto);

        assertNotNull(result);
        assertEquals(requestDto.getDepartures(), result.getDepartures());
        verify(timesTableRepository, times(1)).save(any(TimesTable.class));
    }

    @Test
    void updateTimesTable_NotFound() {
        TimesTableRequestDto requestDto = new TimesTableRequestDto(
                LocalDateTime.of(2024, 10, 14, 9, 0),
                LocalDateTime.of(2024, 10, 14, 11, 0),
                1L, 2L
        );

        when(timesTableRepository.findById(99L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                timesTableService.updateTimesTable(99L, requestDto));

        assertEquals("TimesTable not found with id: 99", exception.getMessage());
        verify(timesTableRepository, times(0)).save(any(TimesTable.class));
    }
}
