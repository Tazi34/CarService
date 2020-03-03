package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.status.StatusService;
import com.tazi34.carservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;


@RestController
@RequestMapping("/reservations")
public class CarReservationsController {
    private  StatusService statusService;
    private ReservationService reservationService;

    @Autowired
    public CarReservationsController(StatusService statusService,
                                     ReservationService reservationService) {
        this.statusService = statusService;
        this.reservationService = reservationService;
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<ReservationInfo>> getUserReservations(@PathVariable("email") String email){
        return ResponseEntity.ok().body(reservationService.getUserReservationsByEmail(email));

    }

    @GetMapping("/{id}")
    public ResponseEntity getReservation(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(statusService.getReservation(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity cancelReservation(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(statusService.cancelReservation(id));
    }

    @PostMapping
    public ResponseEntity postReservation(@RequestBody @NotNull @Valid CarReservation carReservation) {
        return ResponseEntity.ok().body(statusService.saveReservation(carReservation).getId());
    }
}
