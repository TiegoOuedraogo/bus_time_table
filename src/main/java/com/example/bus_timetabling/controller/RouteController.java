package com.example.bus_timetabling.controller;

import com.example.bus_timetabling.dto.RouteRequestDto;
import com.example.bus_timetabling.dto.RouteResponseDto;
import com.example.bus_timetabling.service.RouteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
@CrossOrigin
public class RouteController {
    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }
    @GetMapping
    public List<RouteResponseDto> retrieveAllRoutes (){
        return routeService.retrieveAllRoutes();

    }
    @GetMapping ("/route_id")
    public RouteResponseDto findRouteById (@PathVariable Long route_id){
        return routeService.findRouteById(route_id);
    }

    @GetMapping("/route_id")
    public RouteResponseDto deleteRouteById(@PathVariable Long route_id){
        return routeService.deleteRouteById(route_id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RouteResponseDto createRoute(RouteRequestDto routeRequestDto){
        return routeService.createRoute(routeRequestDto);
    }
}
