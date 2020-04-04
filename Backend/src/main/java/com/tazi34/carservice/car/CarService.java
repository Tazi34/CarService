package com.tazi34.carservice.car;


import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static com.tazi34.carservice.car.CarSpecification.*;


@Service
public class CarService {

    private final StatusService statusService;
    private final CarRepository carRepository;

    @Autowired
    public CarService(StatusService statusService, CarRepository carRepository) {
        this.statusService = statusService;
        this.carRepository = carRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Page findAllCars(Integer seats, Integer year, String make, Integer spotId, Pageable pageable) {
        return carRepository.findAll(bySeats(seats).and(byYear(year)).and(byMake(make)), pageable);
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

    public boolean checkIfCarAvailable(Car car, Date from, Date to) {
        List<Status> statuses = statusService.findCarsAvailabilityStatuses(car, from, to);
        return statuses.isEmpty();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car getCar(Long id) {
        var car = carRepository.findById(id);
        if (car.isPresent()) {
            return car.get();
        }
        throw new ResourceNotFoundException("Car not found");
    }

    public Page<Car> getAvailableCars(Date startDate, Date endDate, Integer spotId, Pageable pageable) {
        List<Status> statusesWhichDenyReservation = statusService.findStatusesWhichDenyCarsReservation(startDate,
                endDate);
        return carRepository.findAll(isNotDeniedByStatuses(statusesWhichDenyReservation), pageable);
    }
}



