package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import com.tazi34.carservice.carlocation.spot.SpotService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.InvalidReservationPriceReceivedException;
import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private StatusService statusService;
    private ClientInfoService clientInfoService;
    private SpotService spotService;
    private CarService carService;
    private ReservationMapper reservationMapper;
    private ReservationDateChecker reservationDateChecker;
    private PriceCalculator priceCalculator;

    @Autowired
    public ReservationService(StatusService statusService, ClientInfoService clientInfoService,
                              SpotService spotService, CarService carService, ReservationMapper reservationMapper,
                              ReservationDateChecker reservationDateChecker, PriceCalculator priceCalculator) {
        this.statusService = statusService;
        this.clientInfoService = clientInfoService;
        this.spotService = spotService;
        this.reservationMapper = reservationMapper;
        this.carService = carService;
        this.reservationDateChecker = reservationDateChecker;
        this.priceCalculator = priceCalculator;
    }

    public List<ReservationInfo> getUserReservationsByEmail(String email) {
        ClientInfo clientInfo;

        try {
            clientInfo = clientInfoService.getClientInfoByEmail(email);
        } catch (ResourceNotFoundException clientNotFoundException) {
            return new ArrayList<>();
        }

        List<Status> clientsStatuses = statusService.getClientsStatuses(clientInfo);

        if (clientsStatuses.isEmpty()) {
            return new ArrayList<>();
        }

        return reservationMapper.map(clientsStatuses);
    }

    public Status saveReservation(CarReservation carReservation) {
        long carId = carReservation.getCarId();
        Car car = carService.getCar(carId);

        if (!reservationDateChecker.checkIfCorrectDate(carReservation.getFromDate(), carReservation.getToDate())) {
            throw new BadRequestException("Wrong date.");
        }

        if (!carService.checkIfCarAvailable(car, carReservation.getFromDate(), carReservation.getToDate())) {
            throw new BadRequestException("Car not available.");
        }

        var startDate = carReservation.getFromDate();
        var endDate = carReservation.getToDate();
        var price = priceCalculator.CalculateReservationPrice(car, startDate, endDate);

        if (carReservation.getPriceTotal().compareTo(price) != 0) {
            throw new InvalidReservationPriceReceivedException();
        }

        var startSpot = spotService.getSpot(carReservation.getStartSpotId());
        var endSpot = spotService.getSpot(carReservation.getEndSpotId());

        var clientInfo = clientInfoService.updateClientInfo(carReservation.getClientInfo());
        Status status = new Status(car, clientInfo, "CarService booking", startDate, endDate, StatusType.BOOKED,
                startSpot, endSpot, price);

        return statusService.saveStatus(status);
    }

    public ReservationInfo getReservationInfo(long id) {
        Status status = statusService.getStatus(id);

        if (!isBooked(status)) {
            throw new ResourceNotFoundException(Car.class);
        }

        return reservationMapper.map(status);
    }

    public void cancelReservation(Long id) {
        var status = statusService.getStatus(id);

        if (!isBooked(status)) {
            throw new BadRequestException("Wrong status type. Must be of type BOOKED");
        }
        status.setType(StatusType.BOOKINGCANCELED);
        statusService.updateStatus(status);
    }

    private boolean isBooked(Status status) {
        var type = status.getType();
        return type == StatusType.BOOKED;
    }
}
