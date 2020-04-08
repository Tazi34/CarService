package com.tazi34.carservice.status;


import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.exceptions.IncorrectDateSpanException;
import com.tazi34.carservice.exceptions.badRequest.BadRequestException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public Page findAll(Date startDate, Date endDate, StatusType statusType, Long carId, Pageable pageable) {
        return statusRepository.findAll(fromDateBefore(startDate).and(fromDateAfter(endDate)).and(isType(statusType).and(byCarId(carId))), pageable);
    }
    public Status updateStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            return statusRepository.save(status);
        }
        throw new ResourceNotFoundException(Status.class);
    }

    public Status getStatus(Long id) {
        Optional<Status> statusOptional = statusRepository.findById(id);
        if (statusOptional.isPresent()) {
            return statusOptional.get();
        }
        throw new ResourceNotFoundException(Status.class);
    }
    public Status deleteStatus(Status status) {
        if (statusRepository.existsById(status.getId())) {
            statusRepository.delete(status);
            return status;
        }
        throw new ResourceNotFoundException(Status.class);
    }

    public Status saveStatus(Status status) throws IncorrectDateSpanException {

        var isDateSpanCorrect = reservationDateChecker.checkIfCorrectDate(status.getDateFrom(), status.getDateTo());
        if (!isDateSpanCorrect) {
            throw new IncorrectDateSpanException("Incorrect date span");
        }

        if (status.getId() != null) {
            if (statusRepository.existsById(status.getId())) {
                throw new BadRequestException("Status already exists");
            }
        }
        return statusRepository.save(status);
    }

    public Iterable<Status> cancelCollidingReservations(Date from, Date to, long carId) {
        List<Status> collidingStatuses =
                statusRepository.findAll(collidesWithDateSpan(from, to).and(StatusSpecifications.byCarId(carId).and(StatusSpecifications.isType(StatusType.BOOKED))));
        collidingStatuses.forEach(status -> status.setType(StatusType.BOOKINGCANCELED));
        return statusRepository.saveAll(collidingStatuses);
    }

    public List<Status> getClientsStatuses(ClientInfo clientInfo) {
        return statusRepository.findByClientInfo(clientInfo, Sort.by("dateFrom").descending());
    }
    public List<Status> findCarsAvailabilityStatuses(Car car, Date startDate, Date endDate) {
        return statusRepository.findAll(collidesWithDateSpan(startDate, endDate).and(isUnavailableOrBooked()).and(byCarId(car.getId())));
    }
    public List<Status> findStatusesWhichDenyCarsReservation(Date startDate, Date endDate) {
        return statusRepository.findAll(collidesWithDateSpan(startDate, endDate).and(isUnavailableOrBooked()));
    }


}
