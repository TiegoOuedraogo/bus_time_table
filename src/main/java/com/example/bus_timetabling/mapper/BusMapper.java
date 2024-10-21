package com.example.bus_timetabling.mapper;

import com.example.bus_timetabling.dto.BusDto;
import com.example.bus_timetabling.dto.BusResponseDto;
import com.example.bus_timetabling.entities.Bus;
import org.springframework.stereotype.Service;

@Service
public class BusMapper {

    public Bus toBus(BusDto dto) {
        if(dto == null) {
            throw new NullPointerException("The Bus DTO is null");
        }

        var bus = new Bus();
        bus.setId(dto.getId());
        bus.setBusNumber(dto.getBusNumber());
        bus.setCapacity(dto.getCapacity());
        bus.setStatus(dto.getStatus());
        bus.setTimesTables(dto.getTimesTables());
        bus.setRoute(dto.getRoute());


        return bus;
    }

    public BusResponseDto toBusResponseDTO(Bus bus) {
        return new BusResponseDto(bus.getId(), bus.getBusNumber(), bus.getCapacity(), bus.getStatus(), bus.getTimesTables(), bus.getRoute());
    }
}
