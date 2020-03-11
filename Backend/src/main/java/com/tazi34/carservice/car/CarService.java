package com.tazi34.carservice.car;


import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class CarService {

    private final StatusRepository statusRepository;
    private final CarRepository carRepository;

    @Autowired
    public CarService(StatusRepository statusRepository, CarRepository carRepository) {
        this.statusRepository = statusRepository;
        this.carRepository = carRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car updateCar(Car car) {
        if (carRepository.existsById(car.getId())) {
            carRepository.save(car);
            return carRepository.save(car);
        }
        throw new ResourceNotFoundException("Car not found");
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car deleteCar(Car car) {
        if (carRepository.existsById(car.getId())) {
            car.setActive(false);
            carRepository.save(car);
            return car;
        }
        throw new ResourceNotFoundException("Car not found");
    }

    public Specification<Car> getAvailabilitySpec(Date from, Date to, boolean available) {
        List<Status> statuses = statusRepository.findAll(
                StatusSpecifications.isUnavailableOrBooked().and(StatusSpecifications.collidesWithDateSpan(from, to)));
        return available ? CarSpecification.isNotDeniedByStatuses(statuses) : CarSpecification.isDeniedByStatuses(statuses);
    }

    public boolean checkIfAvailable(Car car, Date from, Date to) {
        List<Status> statuses = statusRepository.findAll(StatusSpecifications.byCarId(car.getId()).and(StatusSpecifications.isUnavailableOrBooked()).and(StatusSpecifications.collidesWithDateSpan(from, to)));
        return statuses.isEmpty();
    }

    public Car getCar(Long id) {
        var car = carRepository.findById(id);
        if (car.isPresent()) {
            return car.get();
        }
        throw new ResourceNotFoundException("Car not found");
    }
}



