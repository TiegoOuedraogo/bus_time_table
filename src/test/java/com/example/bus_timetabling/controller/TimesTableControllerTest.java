package com.example.bus_timetabling.controller;

import com.example.bus_timetabling.dto.TimesTableRequestDto;
import com.example.bus_timetabling.dto.TimesTableResponseDto;
import com.example.bus_timetabling.service.TimesTableService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;

@WebMvcTest(TimesTableController.class)
public class TimesTableControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TimesTableService timesTableService;

    @Test
    public void testGetAllTimesTables() throws Exception {
        TimesTableResponseDto responseDto = new TimesTableResponseDto(
                1L, LocalDateTime.of(2024, 10, 14, 8, 0),
                LocalDateTime.of(2024, 10, 14, 10, 30),
                1L, "Bus 27", 2L, "Stop A", null
        );
        List<TimesTableResponseDto> responseList = Arrays.asList(responseDto);

        Mockito.when(timesTableService.getAllTimesTables()).thenReturn(responseList);

        mockMvc.perform(get("/api/timetables")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].busNumber", is("Bus 27")))
                .andExpect(jsonPath("$[0].stopName", is("Stop A")));
    }

    @Test
    public void testCreateTimesTable() throws Exception {
        TimesTableRequestDto requestDto = new TimesTableRequestDto(
                LocalDateTime.of(2024, 10, 14, 8, 0),
                LocalDateTime.of(2024, 10, 14, 10, 30),
                1L, 2L
        );

        TimesTableResponseDto responseDto = new TimesTableResponseDto(
                1L, requestDto.getDepartures(), requestDto.getArrival(),
                requestDto.getBusId(), "Bus 27", requestDto.getStopId(),
                "Stop A", null
        );

        Mockito.when(timesTableService.createTimesTable(Mockito.any(TimesTableRequestDto.class)))
                .thenReturn(responseDto);

        mockMvc.perform(post("/api/timetables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                        "departures": "2024-10-14T08:00:00",
                        "arrival": "2024-10-14T10:30:00",
                        "busId": 1,
                        "stopId": 2
                    }
                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.busNumber", is("Bus 27")))
                .andExpect(jsonPath("$.stopName", is("Stop A")));
    }

    @Test
    public void testGetTimesTableById() throws Exception {
        TimesTableResponseDto responseDto = new TimesTableResponseDto(
                1L, LocalDateTime.of(2024, 10, 14, 8, 0),
                LocalDateTime.of(2024, 10, 14, 10, 30),
                1L, "Bus 27", 2L, "Stop A", null
        );

        Mockito.when(timesTableService.getTimesTableById(1L)).thenReturn(responseDto);

        mockMvc.perform(get("/api/timetables/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.busNumber", is("Bus 27")))
                .andExpect(jsonPath("$.stopName", is("Stop A")));
    }

    @Test
    public void testDeleteTimesTable() throws Exception {
        Mockito.doNothing().when(timesTableService).deleteTimesTable(1L);

        mockMvc.perform(delete("/api/timetables/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateTimesTable_MissingBusId() throws Exception {
        mockMvc.perform(post("/api/timetables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                {
                    "departures": "2024-10-14T08:00:00",
                    "arrival": "2024-10-14T10:30:00",
                    "stopId": 2
                }
            """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.busId", is("Bus ID cannot be null")));
    }

    @Test
    public void testGetTimesTableById_NotFound() throws Exception {
        Mockito.when(timesTableService.getTimesTableById(100L))
                .thenThrow(new IllegalArgumentException("TimesTable not found with id: 100"));

        mockMvc.perform(get("/api/timetables/100")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", is("TimesTable not found with id: 100")));
    }

    @Test
    public void testUpdateTimesTable_InvalidDates() throws Exception {
        var result = mockMvc.perform(put("/api/timetables/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                {
                    "departures": "2024-10-14T10:30:00",
                    "arrival": "2024-10-14T08:00:00",
                    "busId": 1,
                    "stopId": 2
                }
            """))
                .andExpect(status().isBadRequest())
                .andReturn();

        System.out.println("Response: " + result.getResponse().getContentAsString());
    }



    @Test
    public void testDeleteTimesTable_Twice() throws Exception {
        Mockito.doNothing().when(timesTableService).deleteTimesTable(1L);
        mockMvc.perform(delete("/api/timetables/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        Mockito.doThrow(new IllegalArgumentException("TimesTable not found with id: 1"))
                .when(timesTableService).deleteTimesTable(1L);

        mockMvc.perform(delete("/api/timetables/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", containsString("TimesTable not found")));
    }


    @Test
    public void testGetTimesTablesByBusId_NotFound() throws Exception {
        Mockito.when(timesTableService.getTimesTablesByBusId(100L))
                .thenReturn(List.of());

        mockMvc.perform(get("/api/timetables/bus/100")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }


}
