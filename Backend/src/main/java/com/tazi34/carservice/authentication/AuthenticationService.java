package com.tazi34.carservice.authentication;

import com.tazi34.carservice.Exceptions.UserAlreadyExistsException;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserDTO;
import com.tazi34.carservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private UserService userService;
    @Autowired
    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    public UserDTO registerUser(User user){
        UserDTO userDTO = null;

        if(userService.userExists(user))
            throw new UserAlreadyExistsException();

        var savedUser = userService.save(user);
        return new UserDTO(savedUser.getId(),savedUser.getEmail());
    }
}
