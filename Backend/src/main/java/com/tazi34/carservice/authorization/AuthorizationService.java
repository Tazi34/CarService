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

    public Collection<? extends GrantedAuthority> getUserAuthorities(User user) {
        return getAuthorities(user.getRoles());
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        return mapNamesToGrantedAuthorities(getPrivilegesNames(roles), getRolesNames(roles));
    }

    private List<GrantedAuthority> mapNamesToGrantedAuthorities(List<String> privileges, List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        roles.forEach(roleString -> authorities.add(new SimpleGrantedAuthority(roleString)));
        privileges.forEach(privilege -> authorities.add(new SimpleGrantedAuthority(privilege)));

        return authorities;
    }

    private List<String> getPrivilegesNames(Collection<Role> roles) {
        List<String> privileges = new ArrayList<>();
        List<Privilege> collection = new ArrayList<>();

        roles.forEach(role -> collection.addAll(role.getPrivileges()));
        collection.forEach(privilege -> privileges.add(privilege.getName()));

        return privileges;
    }

    private List<String> getRolesNames(Collection<Role> roles) {
        return roles.stream().map(el -> el.getName()).collect(Collectors.toList());
    }
}
