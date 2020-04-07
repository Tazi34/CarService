package com.tazi34.carservice.car;


import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.exceptions.badRequest.NullIdException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.tazi34.carservice.car.CarSpecification.*;


@Service
public class CarService {

    private final StatusService statusService;
    private final CarRepository carRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CarService(StatusService statusService, CarRepository carRepository, ModelMapper modelMapper) {
        this.statusService = statusService;
        this.carRepository = carRepository;
        this.modelMapper = modelMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Page findAllCars(Integer seats, Integer year, String make, Integer spotId, Pageable pageable) {
        return carRepository.findAll(bySeats(seats).and(byYear(year)).and(byMake(make)).and(bySpotId(spotId)), pageable).map(car -> modelMapper.map(car, Car.class));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car updateCar(Car car) {
        if (carRepository.existsById(car.getId())) {
            carRepository.save(car);
            return carRepository.save(car);
        }
        throw new ResourceNotFoundException(Car.class);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car addCar(CarDTO carDTO) {
        if (carDTO.getId() != null) {
            throw new BadRequestException("Car with assigned id can't be added.");
        }

        Car car = modelMapper.map(carDTO, Car.class);
        car.setActive(true);

        return carRepository.save(car);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Car deleteCar(Long id) {
        Car car = getCar(id);
        car.setActive(false);
        return carRepository.save(car);
    }

    public boolean checkIfCarAvailable(Car car, Date from, Date to) {
        List<Status> statuses = statusService.findCarsAvailabilityStatuses(car, from, to);
        return statuses.isEmpty();
    }

    public Car getCar(Long id) {
        if (id == null) {
            throw new NullIdException("Id cannot be null");
        }
        Optional<Car> car = carRepository.findById(id);
        if (car.isPresent()) {
            return car.get();
        }
        throw new ResourceNotFoundException(Car.class);
    }

    public CarDTO getCarDTO(Long id) {
        return modelMapper.map(getCar(id), CarDTO.class);
    }

    public Page<Car> getAvailableCars(Date startDate, Date endDate, Integer spotId, Pageable pageable) {
        List<Status> statusesWhichDenyReservation = statusService.findStatusesWhichDenyCarsReservation(startDate,
                endDate);
        return carRepository.findAll(isNotDeniedByStatuses(statusesWhichDenyReservation).and(bySpotId(spotId)),
                pageable);
    }
}



