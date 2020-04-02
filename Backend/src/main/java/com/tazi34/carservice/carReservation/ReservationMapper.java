package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.exceptions.WrongReservationType;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;

public class ReservationMapper {
    @Autowired
    private ModelMapper modelMapper;

    public ReservationInfo mapStatusToReservation(Status status) {
        if(status.getType() == StatusType.UNAVAILABLE){
            throw new WrongReservationType("Status cannot be of type UNAVAILABLE.");
        }
        var carDTO = modelMapper.map(status.getCar(), CarDTO.class);
        var clientInfoDTO = modelMapper.map(status.getClientInfo(), ClientInfoDTO.class);
        var isCanceled = isCanceled(status);
        var reservation = new ReservationInfo(status.getId(), carDTO, status.getDateFrom(), status.getDateTo(), clientInfoDTO, status.getStartSpot(), status.getEndSpot(), isCanceled, status.getPriceTotal());
        reservation.isCancelable = isCancelable(status);
        return reservation;

    }

    private boolean isCancelable(Status status) {
        if (status.getType() == StatusType.BOOKINGCANCELED) return false;
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 1);

        return status.getDateFrom().after(calendar.getTime());
    }

    private boolean isCanceled(Status status) {
        return StatusType.BOOKINGCANCELED == status.getType();
    }
}
