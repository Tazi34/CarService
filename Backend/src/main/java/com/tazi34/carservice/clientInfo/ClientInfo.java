package com.tazi34.carservice.clientInfo;

import com.tazi34.carservice.clientInfo.address.Address;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "client_info")
public class ClientInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@NotBlank
	private String name;
	@NotBlank
	private String surname;
	@Email
	@NotNull
	private String email;

	@OneToOne
	private Address address;


    public ClientInfo(String name, String surname, @Email String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }





}