package com.tazi34.carservice.authentication;

import com.tazi34.carservice.authorization.AuthorizationConstants;
import com.tazi34.carservice.authorization.roles.Role;
import com.tazi34.carservice.authorization.roles.RoleRepository;
import com.tazi34.carservice.exceptions.UserAlreadyExistsException;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserDTO;
import com.tazi34.carservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class AuthenticationService {
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private UserService userService;
    private RoleRepository roleRepository;


    @Autowired
    public AuthenticationService(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    public UserDTO registerUser(User user) {
        if (userService.userExists(user.getEmail())) throw new UserAlreadyExistsException();
        var userWithEncodedPassword = createUser(user);
        var savedUser = userService.save(userWithEncodedPassword);
        return new UserDTO(savedUser.getId(), savedUser.getEmail(), savedUser.getRoles());
    }

    public User createUser(User user) {
        var newUser = new User();

        var userRole = roleRepository.findByName(AuthorizationConstants.ROLE_USER);
        var roles = new HashSet<Role>();
        roles.add(userRole);
        newUser.setRoles(roles);
        userRole.getUsers().add(newUser);
        roleRepository.save(userRole);
        newUser.setPassword(encoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setEnabled(true);
        return newUser;
    }


    public UserDTO getCurrentUser(Authentication authentication) {
        if (authentication == null) return null;
        var email = authentication.getName();
        var user = userService.findByEmail(email);
//TODO make user to dto mapper
        return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
    }

}
