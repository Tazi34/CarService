package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.car.CarDTO;
import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private StatusService statusService;
    private StatusRepository statusRepository;
    private ClientInfoService clientInfoService;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public ReservationService(StatusService statusService, StatusRepository statusRepository,ClientInfoService clientInfoService) {
        this.statusService = statusService;
        this.statusRepository = statusRepository;
        this.clientInfoService = clientInfoService;
    }

    public List<ReservationInfo> getUserReservationsByEmail(String email){
        var clientInfos = clientInfoService.getClientInfosByEmail(email);
        Collection<Status.OnlyReservationInfo> onlyReservationInfos = statusRepository.findByClientInfoIsIn(clientInfos);

        var reservationInfos =
                onlyReservationInfos.stream().map(info -> mapOnlyReservationInfoToReservationInfo(info)).collect(Collectors.toList());

        return reservationInfos;
    }

    private ReservationInfo mapOnlyReservationInfoToReservationInfo(Status.OnlyReservationInfo info){
        var carDTO = modelMapper.map(info.getCar(), CarDTO.class);
        var clientInfoDTO = modelMapper.map(info.getClientInfo(), ClientInfoDTO.class);
        return new ReservationInfo(carDTO,info.getDateFrom(),info.getDateTo(),clientInfoDTO);
    }
}
