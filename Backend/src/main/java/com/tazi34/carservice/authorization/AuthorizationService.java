package com.tazi34.carservice.authorization;

import com.tazi34.carservice.authorization.privileges.Privilege;
import com.tazi34.carservice.authorization.roles.Role;
import com.tazi34.carservice.authorization.roles.RoleRepository;
import com.tazi34.carservice.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorizationService {
    private RoleRepository roleRepository;


    @Autowired
    public AuthorizationService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Collection<? extends GrantedAuthority> getUserAuthorities(User user) {
        return getAuthorities(user.getRoles());
    }


    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges, List<String> roles) {

        List<GrantedAuthority> authorities = new ArrayList<>();

        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }

        return authorities;
    }


    private List<String> getPrivileges(Collection<Role> roles) {

        List<String> privileges = new ArrayList<>();
        List<Privilege> collection = new ArrayList<>();
        for (Role role : roles) {
            collection.addAll(role.getPrivileges());
        }
        for (Privilege item : collection) {
            privileges.add(item.getName());
        }
        return privileges;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        return getGrantedAuthorities(getPrivileges(roles),
                roles.stream().map(el -> el.getName()).collect(Collectors.toList()));
    }


}
