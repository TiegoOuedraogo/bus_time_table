package com.example.bus_timetabling.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
//@Table(name = "stop")
@Data
public class Stop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stop_id")
    private Long id;

    @Column(name = "stop_name")
    private String stopName;

    @ManyToOne
    @JoinColumn(name = "route_id", referencedColumnName = "route_id")
    private Route route;

    @OneToMany(mappedBy = "stop", cascade = CascadeType.ALL)
    private List<TimesTable> timesTables = new ArrayList<>();
}