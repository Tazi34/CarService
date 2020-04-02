package com.tazi34.carservice.status;


import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.CarReservation;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import com.tazi34.carservice.carlocation.spot.SpotService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.BadRequestException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;


@Service
public class StatusService {


    private final StatusRepository statusRepository;
    private final CarService carService;
    private final ClientInfoService clientInfoService;
    private final SpotService spotService;
    private final PriceCalculator priceCalculator;
    private final ReservationDateChecker reservationDateChecker;
    private final ModelMapper mapper;


    //TODO split  class

    public StatusService(StatusRepository statusRepository, @Lazy CarService carService,
                         ClientInfoService clientInfoService, SpotService spotService,
                         PriceCalculator priceCalculator, ReservationDateChecker reservationDateChecker,
                         ModelMapper mapper) {
        this.statusRepository = statusRepository;
        this.carService = carService;
        this.clientInfoService = clientInfoService;
        this.spotService = spotService;
        this.priceCalculator = priceCalculator;
        this.reservationDateChecker = reservationDateChecker;
        this.mapper = mapper;
    }

    //TODO move to reservation service
    public Status saveReservation(CarReservation carReservation) {
        long carId = carReservation.getCarId();
        Car car = carService.getCar(carId);
        if (!reservationDateChecker.checkIfCorrectDate(carReservation.getFromDate(), carReservation.getToDate())) {
            throw new BadRequestException("Wrong date.");
        }

        if (!carService.checkIfAvailable(car, carReservation.getFromDate(), carReservation.getToDate())) {
            throw new BadRequestException("Car not available.");
        }

        //TODO add service for spots
        var startSpot = spotService.getSpot(carReservation.getStartSpotId());
        var endSpot = spotService.getSpot(carReservation.getEndSpotId());

        var startDate = carReservation.getFromDate();
        var endDate = carReservation.getToDate();
        var price = priceCalculator.CalculateReservationPrice(car, startDate, endDate);

        //TODO add tests
        if (carReservation.getPriceTotal().compareTo(price) != 0) {
            throw new RuntimeException("Price from client doesnt match value calculated on server");
        }

        var clientInfo = clientInfoService.updateClientInfo(carReservation.getClientInfo());
        Status status = new Status(car, clientInfo, "CarService booking", startDate, endDate, StatusType.BOOKED,
                startSpot, endSpot, price);

        return statusRepository.save(status);
    }
    public Status updateStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            return statusRepository.save(status);
        }
        throw new ResourceNotFoundException(Status.class);
    }

    public List<Status> getClientsStatuses(ClientInfo clientInfo){
        return statusRepository.findByClientInfo(clientInfo, Sort.by("dateFrom").descending());
    }
    public List<Status> findCollidingBookedStatuses(Date from, Date to, long carId) {
        return statusRepository.findAll(StatusSpecifications.collidesWithDateSpan(from, to).and(StatusSpecifications.byCarId(carId).and(StatusSpecifications.isType(StatusType.BOOKED))));
    }

    private Iterable<Status> saveAll(List<Status> statuses) {
        return statusRepository.saveAll(statuses);
    }
    private void cancelCollidingReservations(Date from, Date to, long carId) {
        List<Status> statusesWhichCollidesWithNewOne = findCollidingBookedStatuses(from, to, carId);
        if (!statusesWhichCollidesWithNewOne.isEmpty()) {
            changeToBookingCancelled(statusesWhichCollidesWithNewOne);
            saveAll(statusesWhichCollidesWithNewOne);
        }
    }

    public Status saveUnavailableStatus(StatusDTO statusDTO) {
        Date from = statusDTO.getDateFrom();
        Date to = statusDTO.getDateTo();

        if (!reservationDateChecker.checkIfCorrectDate(from, to)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong date");
        }

        cancelCollidingReservations(from, to, statusDTO.getCarId());
        Status status = createUnavailableStatus(statusDTO);

        return statusRepository.save(status);
    }
    public Status deleteStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            statusRepository.delete(status);
            return status;
        }
        throw new ResourceNotFoundException(Status.class);
    }
    public Status getStatus(Long id) {
        if (statusRepository.existsById(id)) {
            return statusRepository.findById(id).get();
        }
        throw new ResourceNotFoundException(Status.class);
    }

    private Status createUnavailableStatus(StatusDTO statusDTO) {
        Car car = carService.getCar(statusDTO.getCarId());
        Status status = new Status();
        mapper.map(statusDTO, status);
        status.setId(null);
        status.setType(StatusType.UNAVAILABLE);
        status.setCar(car);
        return status;
    }
    private List<Status> changeToBookingCancelled(List<Status> statuses) {
        statuses.forEach(status -> status.setType(StatusType.BOOKINGCANCELED));
        return statuses;
    }
}
