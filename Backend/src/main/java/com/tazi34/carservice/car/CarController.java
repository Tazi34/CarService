package com.tazi34.carservice.car;


import com.tazi34.carservice.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;


@RestController
@RequestMapping("/cars")
public class CarController {
    private CarService carService;
    private CarRepository carRepository;
    private StatusRepository statusRepository;

    @Autowired
    public CarController(CarService carService, CarRepository carRepository, StatusRepository statusRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
        this.statusRepository = statusRepository;
    }

    @GetMapping("/available")
    public Page<Car> getAvailableCars(@RequestParam(name = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, @RequestParam(name = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate, @RequestParam(name = "spot") Integer spotId, Pageable pageable) {
        return carService.getAvailableCars(startDate, endDate, spotId, pageable);
    }

    @GetMapping()
    public Page getCars(
            @RequestParam(required = false,name="seats") Integer seats,
            @RequestParam(required = false,name="year") Integer year,
            @RequestParam(required = false,name="make") String make,
            @RequestParam(required = false,name="spot") Integer spotId, Pageable pageable) {
        return carService.findAllCars(seats, year, make, spotId, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(carService.getCar(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCar(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(carService.deleteCar(carService.getCar((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Car> updateCar(@RequestBody @Valid Car Car){
        return ResponseEntity.ok().body(carService.updateCar(Car));
    }
    @PutMapping(path = "")
    public ResponseEntity<Car> updateWholeCar(@RequestBody @Valid Car updatedCar) {
        return ResponseEntity.ok().body(carRepository.save(updatedCar));
    }

    @PostMapping("")
    public ResponseEntity<Car> addCar(@RequestBody @Valid CarDTO carDTO) {
        return ResponseEntity.ok().body(carService.addCar(carDTO));
    }
}
