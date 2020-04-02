package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.Car;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.BadRequestException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private StatusService statusService;
    private ClientInfoService clientInfoService;
    private ReservationMapper reservationMapper = new ReservationMapper();

    @Autowired
    public ReservationService(StatusService statusService, ClientInfoService clientInfoService) {
        this.statusService = statusService;
        this.clientInfoService = clientInfoService;
    }

    public void setReservationMapper(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }

    public List<ReservationInfo> getUserReservationsByEmail(String email) {
        ClientInfo clientInfo;

        try {
            clientInfo = clientInfoService.getClientInfoByEmail(email);
        }catch(ResourceNotFoundException clientNotFoundException){
            return new ArrayList<>();
        }

        List<Status> clientsStatuses = statusService.getClientsStatuses(clientInfo);

        if (clientsStatuses.isEmpty()) {
            return new ArrayList<>();
        }

        return mapStatusesToReservations(clientsStatuses);
    }

    public ReservationInfo getReservationInfo(long id) {
        Status status = statusService.getStatus(id);

        if (!isBooked(status)) {
            throw new ResourceNotFoundException(Car.class);
        }

        return reservationMapper.mapStatusToReservation(status);
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

    private List<ReservationInfo> mapStatusesToReservations(List<Status> statuses) {
        return statuses.stream().map(status -> reservationMapper.mapStatusToReservation(status)).collect(Collectors.toList());
    }
}
