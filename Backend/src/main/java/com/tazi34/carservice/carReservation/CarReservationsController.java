package com.tazi34.carservice.carReservation;

import com.tazi34.carservice.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;


@RestController
@RequestMapping("/reservations")
public class CarReservationsController {
    private final StatusService statusService;

    @Autowired
    public CarReservationsController(StatusService statusService) {
        this.statusService = statusService;

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
