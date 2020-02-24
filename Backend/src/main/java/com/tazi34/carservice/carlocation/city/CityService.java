package com.tazi34.carservice.carlocation.city;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    private CityRepository cityRepository;
    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public City getCity(long id){
        Optional<City> city = cityRepository.findById(id);
        if(city.isEmpty())
            throw new ResourceNotFoundException();
        return city.get();
    }
    public List<City> getAllCities(){
        return (List<City>) cityRepository.findAll();
    }


}
