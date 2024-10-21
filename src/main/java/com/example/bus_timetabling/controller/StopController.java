package com.example.bus_timetabling.controller;

import com.example.bus_timetabling.dto.StopRequestDto;
import com.example.bus_timetabling.dto.StopResponseDto;
import com.example.bus_timetabling.entities.Stop;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/stops")
public class StopController {

    @GetMapping("")
    //turn into DTO object response later
    public String getStops() {
        return "These are the stops";
    }

    @GetMapping("/{id}")
    //turn into DTO object response later
    public Long getStopDetail(@PathVariable Long id) {
        return id;
    }

//    @PostMapping(produces = "application/json")
//    public ResponseEntity<StopResponseDto> createStop(@RequestBody StopRequestDto request ) {
//        return "Your stop has been created";
//    }
}
