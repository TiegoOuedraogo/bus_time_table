package com.example.bus_timetabling.entities;

import com.example.bus_timetabling.enums.Service;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
//@Table(name = "bus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bus_id")
    private Long id;

    @Column(name = "number")
    private String busNumber;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "status")
    private Service status;

    //Relationships
    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimesTable> timesTables = new ArrayList<TimesTable>();

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

}

