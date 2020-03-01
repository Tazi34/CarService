package com.tazi34.carservice.clientInfo;

import com.tazi34.carservice.clientInfo.address.AddressDTO;
import lombok.Value;

@Value
public class ClientInfoDTO {
    private String name;
    private String surname;
    private String email;
    private String pid;
    private String phoneNumber;
    private AddressDTO address;

}
