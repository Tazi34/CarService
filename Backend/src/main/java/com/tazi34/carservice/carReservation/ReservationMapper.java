package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.status.Status;
import org.modelmapper.ModelMapper;

public class ReservationMapper {
    private ModelMapper modelMapper = new ModelMapper();

    public ReservationInfo mapStatusToReservation(Status status){
        var carDTO = modelMapper.map(status.getCar(), CarDTO.class);
        var clientInfoDTO = modelMapper.map(status.getClientInfo(), ClientInfoDTO.class);
        return new ReservationInfo(status.getId(), carDTO, status.getDateFrom(), status.getDateTo(), clientInfoDTO,
                status.getStartSpot(), status.getEndSpot());
    }
}
