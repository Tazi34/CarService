package com.tazi34.carservice.location;

import com.tazi34.carservice.location.city.City;
import com.tazi34.carservice.location.city.CityService;
import com.tazi34.carservice.location.spot.Spot;
import com.tazi34.carservice.location.spot.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class LocationController {

    private SpotRepository spotRepository;
    private CityService cityService;

    @Autowired
    public LocationController(SpotRepository spotRepository, CityService cityService) {
        this.spotRepository = spotRepository;
        this.cityService = cityService;
    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<City> getCity(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(cityService.getCity(id));
    }
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getCities(){
        return ResponseEntity.ok().body(cityService.getAllCities());
    }
    @GetMapping("/cities/{id}/spots")
    public ResponseEntity<List<Spot>> getSpots(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(cityService.getCity(id).getSpots());
    }




}

