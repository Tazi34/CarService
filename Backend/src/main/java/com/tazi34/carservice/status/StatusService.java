package com.tazi34.carservice.status;


import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.CarReservation;
import com.tazi34.carservice.carReservation.ReservationInfo;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Service
public class StatusService {

    private static final ModelMapper mapper = new ModelMapper();
    private final StatusRepository statusRepository;
    private final CarService carService;
    private final ClientInfoService clientInfoService;

    //TODO split  class
    @Autowired
    public StatusService(StatusRepository statusRepository, @Lazy CarService carService,
                         ClientInfoService clientInfoService) {
        this.carService = carService;
        this.statusRepository = statusRepository;
        this.clientInfoService = clientInfoService;
    }

    public ReservationInfo getReservation(Long statusID) {
        Status status = getStatus(statusID);

        CarDTO carDTO = mapper.map(status.getCar(), CarDTO.class);
        return new ReservationInfo(carDTO, status.getDateFrom(), status.getDateTo());
    }

    public Status saveReservation(CarReservation carReservation) {
        long carId = carReservation.getCarId();
        Car car = carService.getCar(carId);
        if (!checkIfCorrectDate(carReservation.getFromDate(), carReservation.getToDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong date");
        }

        if (!carService.checkIfAvailable(car, carReservation.getFromDate(), carReservation.getToDate())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car is not available.");
        }

        ClientInfoDTO clientInfoDTO = carReservation.getClientInfoDTO();
        ClientInfo clientInfo = clientInfoService.addClientInfo(clientInfoDTO);
        Status status = new Status(car, clientInfo, "CarService booking", carReservation.getFromDate(),
                carReservation.getToDate(), StatusType.BOOKED);


        return statusRepository.save(status);
    }

    public Status updateStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            return statusRepository.save(status);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found.");
    }

    private boolean checkIfCorrectDate(Date from, Date to) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, (-5));
        Date currentDateToCompare = cal.getTime();
        if (from.before(currentDateToCompare) || from.after(to)) {
            return false;
        }
        return true;
    }

    public List<Status> findCollidingBookedStatuses(Date from, Date to, long carId) {
        return statusRepository.findAll(StatusSpecifications.collidesWithDateSpan(from, to).and(StatusSpecifications.byCarId(carId).and(StatusSpecifications.isType(StatusType.BOOKED))));
    }

    private List<Status> changeToBookedType(List<Status> statuses) {
        for (Status s : statuses) {
            s.setType(StatusType.BOOKINGCANCELED);
        }
        return statuses;
    }

    private Iterable<Status> saveAll(List<Status> statuses) {
        return statusRepository.saveAll(statuses);
    }

    private void cancelCollidingReservations(Date from, Date to, long carId) {
        List<Status> statusesWhichCollidesWithNewOne = findCollidingBookedStatuses(from, to, carId);
        if (!statusesWhichCollidesWithNewOne.isEmpty()) {
            changeToBookedType(statusesWhichCollidesWithNewOne);
            saveAll(statusesWhichCollidesWithNewOne);
        }
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

    public Status saveUnavailableStatus(StatusDTO statusDTO) {
        Date from = statusDTO.getDateFrom();
        Date to = statusDTO.getDateTo();

        if (!checkIfCorrectDate(from, to)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong date");
        }

        cancelCollidingReservations(from, to, statusDTO.getCarId());
        Status status = createUnavailableStatus(statusDTO);

        return statusRepository.save(status);
    }

    public boolean cancelReservation(Long id) {
        Status status = getStatus(id);
        status.setType(StatusType.BOOKINGCANCELED);
        statusRepository.save(status);
        return true;
    }

    public Status deleteStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            return status;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found.");
    }

    public Status getStatus(Long id) {
        if (statusRepository.existsById(id)) {
            return statusRepository.findById(id).get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found.");
    }
}
