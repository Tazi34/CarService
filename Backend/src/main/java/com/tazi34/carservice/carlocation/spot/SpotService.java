package com.tazi34.carservice.carlocation.spot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SpotService {
    @Autowired
    private SpotRepository spotRepository;

    public Spot getSpot(long id) {
        var spot = spotRepository.findById(id);
        if (spot.isEmpty()) throw new ResourceNotFoundException();
        return spot.get();
    }
}
