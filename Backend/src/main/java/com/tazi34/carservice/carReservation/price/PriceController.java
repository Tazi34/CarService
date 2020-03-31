package com.tazi34.carservice.carReservation.price;

import com.tazi34.carservice.car.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Date;

@RestController
@RequestMapping("/price")
public class PriceController {
    private PriceCalculator priceCalculator = new PriceCalculator();
    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<BigDecimal> getPrice(@RequestParam("carId") Long carId,
                                               @RequestParam("startDate") @DateTimeFormat(iso =
                                                       DateTimeFormat.ISO.DATE) Date startDate, @RequestParam(
                                                               "endDate") @DateTimeFormat(iso =
            DateTimeFormat.ISO.DATE) Date endDate) {
        return ResponseEntity.ok().body(priceCalculator.CalculateReservationPrice(carService.getCar(carId), startDate
                , endDate));
    }
}
