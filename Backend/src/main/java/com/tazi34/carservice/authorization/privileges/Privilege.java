package com.tazi34.carservice.authorization.privileges;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tazi34.carservice.authorization.roles.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@Table(name = "privileges")
@NoArgsConstructor
@AllArgsConstructor
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @ManyToMany(mappedBy = "privileges")
    @JsonIgnore
    @ToString.Exclude
    private Collection<Role> roles;
}