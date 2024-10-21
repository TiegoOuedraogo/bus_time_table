package com.example.bus_timetabling.repository;

import com.example.bus_timetabling.entities.Stop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StopRepository extends JpaRepository<Stop, Long> {
    List<Stop> retrieveAllStops();
}
