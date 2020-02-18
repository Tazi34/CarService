package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import pw.react.carly.status.Status;
import pw.react.carly.status.StatusRepository;
import pw.react.carly.status.StatusService;

import java.util.Date;
import java.util.List;

import static pw.react.carly.car.CarSpecification.isDeniedByStatuses;
import static pw.react.carly.car.CarSpecification.isNotDeniedByStatuses;
import static pw.react.carly.status.StatusSpecifications.*;


@Service
public class CarService {

    private StatusRepository statusRepository;
    private CarRepository carRepository;

    @Autowired
    public CarService(StatusRepository statusRepository, CarRepository carRepository,StatusService statusService) {
        this.statusRepository = statusRepository;
        this.carRepository = carRepository;
    }

    public Car updateCar(Car car){
        if(carRepository.existsById(car.getId())) {
            carRepository.save(car);
            return carRepository.save(car);
        }
        throw new ResourceNotFoundException("Car not found");
    }

    public Car deleteCar(Car car){
        if(carRepository.existsById(car.getId())) {
            car.setActive(false);
            carRepository.save(car);
            return car;
        }
        throw new ResourceNotFoundException("Car not found");
    }

    public Specification<Car> getAvailabilitySpec(Date from,Date to,boolean available){
        List<Status> statuses = statusRepository.findAll(
                isUnavailableOrBooked().and(collidesWithDateSpan(from,to)));
        return available ? isNotDeniedByStatuses(statuses) : isDeniedByStatuses(statuses);
    }

    public boolean checkIfAvailable(Car car, Date from, Date to){
        List<Status> statuses = statusRepository.findAll(byCarId(car.getId()).and(isUnavailableOrBooked()).and(collidesWithDateSpan(from,to)));
        return statuses.isEmpty();
    }

    public Car getCar(Long id){
        if(carRepository.existsById(id)) {
            return carRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Car not found");
    }
}



