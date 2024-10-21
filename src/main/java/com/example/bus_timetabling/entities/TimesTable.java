package com.example.bus_timetabling.entities;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
//@Table(name = "times_table")
@Data
public class TimesTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "times_table_id")
    private Long id;

    @Column(name = "departures")
    @CreationTimestamp
    private LocalDateTime departures;

    @Column(name = "arrival")
    @CreationTimestamp
    private LocalDateTime arrival;
        //Relationship
    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    @ManyToOne
    @JoinColumn(name = "stop_id")
    private Stop stop;

}


