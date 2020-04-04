package com.tazi34.carservice.status;


import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.clientInfo.ClientInfo;
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
import java.util.Optional;

import static com.tazi34.carservice.status.StatusSpecifications.*;


@Service
public class StatusService {

    private final StatusRepository statusRepository;
    private final CarService carService;
    private final ReservationDateChecker reservationDateChecker;
    private final ModelMapper mapper;

    public StatusService(StatusRepository statusRepository, @Lazy CarService carService, ReservationDateChecker reservationDateChecker, ModelMapper mapper) {
        this.statusRepository = statusRepository;
        this.carService = carService;
        this.reservationDateChecker = reservationDateChecker;
        this.mapper = mapper;
    }

    public Status updateStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            return statusRepository.save(status);
        }
        throw new ResourceNotFoundException(Status.class);
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

    public Status saveStatus(Status status) {
        if (status.getId() != null) {
            if (statusRepository.existsById(status.getId())) {
                throw new BadRequestException("Status already exists");
            }
        }
        return statusRepository.save(status);
    }

    public List<Status> getClientsStatuses(ClientInfo clientInfo) {
        return statusRepository.findByClientInfo(clientInfo, Sort.by("dateFrom").descending());
    }

    public List<Status> findCollidingBookedStatuses(Date from, Date to, long carId) {
        return statusRepository.findAll(collidesWithDateSpan(from, to).and(StatusSpecifications.byCarId(carId).and(StatusSpecifications.isType(StatusType.BOOKED))));
    }

    public List<Status> findCarsAvailabilityStatuses(Car car, Date startDate, Date endDate) {
        return statusRepository.findAll(collidesWithDateSpan(startDate, endDate).and(isUnavailableOrBooked()).and(byCarId(car.getId())));
    }

    public List<Status> findStatusesWhichDenyCarsReservation(Date startDate, Date endDate) {
        return statusRepository.findAll(collidesWithDateSpan(startDate, endDate).and(isUnavailableOrBooked()));
    }

    public Status getStatus(Long id) {
        Optional<Status> statusOptional = statusRepository.findById(id);
        if (statusOptional.isPresent()) {
            return statusOptional.get();
        }
        throw new ResourceNotFoundException(Status.class);
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
