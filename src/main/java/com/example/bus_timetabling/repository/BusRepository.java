package com.example.bus_timetabling.repository;

import com.example.bus_timetabling.entities.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    List<Bus> findByBusNumber(String busNumber);

    List<Bus> findBusByRouteId(Long Id);

//    List<Bus> findBusByStopId(Long Id);
}
