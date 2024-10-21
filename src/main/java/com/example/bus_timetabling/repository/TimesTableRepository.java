package com.example.bus_timetabling.repository;

import com.example.bus_timetabling.entities.TimesTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesTableRepository extends JpaRepository<TimesTable, Long> {
    List<TimesTable> findByBusId(Long busId);

    List<TimesTable> findByStopId(Long stopId);
}
