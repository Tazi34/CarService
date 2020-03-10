package com.tazi34.carservice.authorization;


import java.util.Arrays;
import java.util.List;

public class AuthorizationConstants {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";


    public static List<String> ADMIN_PRIVILEGES = Arrays.asList("CARS_ADD", "CARS_EDIT", "CARS_DELETE", "CARS_LIST",
            "RESERVATIONS_LIST", "RESERVATIONS_EDIT", "RESERVATIONS_DELETE");
    public static List<String> USER_PRIVILEGES = Arrays.asList("CARS_LIST", "RESERVATIONS_LIST", "RESERVATIONS_EDIT",
            "RESERVATIONS_ADD");
}
