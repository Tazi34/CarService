package com.tazi34.carservice.clientInfo;

import com.tazi34.carservice.clientInfo.address.Address;
import com.tazi34.carservice.user.User;
import lombok.Data;
import org.hibernate.annotations.Cascade;

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
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String surname;
    @Email
    @NotNull
    @Column(unique = true)
    private String email;

    private String pid;

    private String phoneNumber;

    @OneToOne
    private User user;
    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Address address;

    public ClientInfo() {

    }

    public ClientInfo(String name, String surname, @Email String email) {

        this.name = name;
        this.surname = surname;
        this.email = email;
    }


}