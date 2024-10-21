package com.example.bus_timetabling.mapper;

import com.example.bus_timetabling.dto.RouteResponseDto;
import com.example.bus_timetabling.entities.Bus;
import com.example.bus_timetabling.entities.Route;
import com.example.bus_timetabling.entities.Stop;
import com.example.bus_timetabling.repository.BusRepository;
import com.example.bus_timetabling.repository.StopRepository;

import java.util.List;

public class RouteMapper {
    private final BusRepository busRepository;
    private final StopRepository stopRepository;

    public RouteMapper(BusRepository busRepository , StopRepository stopRepository){
        this.busRepository = busRepository;
        this.stopRepository = stopRepository;
    }

    // DTO to Entity
    public Route toEntity(RouteResponseDto routeResponseDto){

        //Fetch List of buses and stops
        List<Bus> buses = busRepository.retrieveAllBuses();
        List <Stop> stops = stopRepository.retrieveAllStops();

       //Create and return Route Entity
        return new Route(
                routeResponseDto.route_id(),
                routeResponseDto.route_name(),
                routeResponseDto.origin(),
                routeResponseDto.destination(),
                routeResponseDto.distance(),
                routeResponseDto.stops(), //convert lists dto to list entity using stop mapper
                routeResponseDto.buses() //convert lists dto to list entity using bus mapper
        );
    }

    // Entity to DTO
    public static RouteResponseDto toDTO(Route route){
        return new RouteResponseDto(
                route.getId(),
                route.getRouteName(),
                route.getRouteOrigin(),
                route.getDestination(),
                route.getDistance(),
                route.getStops(), //convert lists entity to list dto using stop mapper
                route.getBuses() //convert lists entity to list dto using bus mapper
        );
    }
}
