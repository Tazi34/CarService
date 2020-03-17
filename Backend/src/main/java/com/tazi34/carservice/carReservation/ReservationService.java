package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.BadRequestException;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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
        if (email == null) throw new RuntimeException("Email can't be null");

        var clientInfo = clientInfoService.getClientInfoByEmail(email);
        if (clientInfo == null) throw new ResourceNotFoundException("Client info not found");
        List<Status> clientsStatuses = statusService.getClientsStatuses(clientInfo);
        if (clientsStatuses.isEmpty()) return new ArrayList<ReservationInfo>();
        return mapStatusesToReservations(clientsStatuses);
    }
    private List<ReservationInfo> mapStatusesToReservations(List<Status> statuses) {
        return statuses.stream().map(status -> reservationMapper.mapStatusToReservation(status)).collect(Collectors.toList());
    }
    public ReservationInfo getReservationInfo(long id){
        Status status = null;
        //TODO  create new exception class
        var exceptionMessage = "Reservation not found.";
        try {
            status = statusService.getStatus(id);
        }
        catch(ResourceNotFoundException exception){
            throw new ResourceNotFoundException(exceptionMessage);
        }
        if (!isBooked(status))
            throw new ResourceNotFoundException(exceptionMessage);

        return reservationMapper.mapStatusToReservation(status);
    }
    public void cancelReservation(Long id){
        var status = statusService.getStatus(id);
        if(!isBooked(status)) throw new BadRequestException("Wrong status type. Must be of type BOOKED");
        status.setType(StatusType.BOOKINGCANCELED);
        statusService.updateStatus(status);
    }
    private boolean isBooked(Status status){
        var type = status.getType();
        return type == StatusType.BOOKED;
    }


}
