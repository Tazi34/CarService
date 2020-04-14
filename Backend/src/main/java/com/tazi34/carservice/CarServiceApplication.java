package com.tazi34.carservice;

import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.carReservation.ReservationMapper;
import com.tazi34.carservice.carReservation.price.PriceCalculator;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CarServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarServiceApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public PriceCalculator priceCalculator(){
        return new PriceCalculator();
    }

    @Bean
    public ReservationDateChecker reservationDateChecker(){
        return new ReservationDateChecker();
    }

    @Bean
    public ReservationMapper reservationMapper() {
        return new ReservationMapper();
    }
}
