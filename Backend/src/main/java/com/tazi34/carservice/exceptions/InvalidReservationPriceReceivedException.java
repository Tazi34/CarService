package com.tazi34.carservice.exceptions;

public class InvalidReservationPriceReceivedException extends RuntimeException {
    public InvalidReservationPriceReceivedException() {
        super("Price received from client doesn't match price calculated on server.");
    }
}
