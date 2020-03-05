package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.status.StatusType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.Collection;
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
    public ReservationMapper getReservationMapper() {
        return reservationMapper;
    }
    public void setReservationMapper(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }


    public List<ReservationInfo> getUserReservationsByEmail(String email) {
        if (email == null) throw new RuntimeException("Email was null");

        var clientInfo = clientInfoService.getClientInfoByEmail(email);
        if (clientInfo == null) throw new ResourceNotFoundException("Client info not found");
        List<Status> clientsStatuses = statusService.getClientsStatuses(clientInfo);

        if (clientsStatuses.isEmpty()) return new ArrayList<ReservationInfo>();

        var reservationInfos = mapStatusesToReservations(clientsStatuses);

        return reservationInfos;
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
        var type = status.getType();
        if( type != StatusType.BOOKED && type != StatusType.BOOKINGCANCELED)
            throw new ResourceNotFoundException(exceptionMessage);

        return reservationMapper.mapStatusToReservation(status);
    }
}
