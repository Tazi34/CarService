package com.tazi34.carservice.authentication;

import com.tazi34.carservice.config.security.SecurityConstants;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserDTO;
import com.tazi34.carservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthenticationController {

    private final UserService userService;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public AuthenticationController(UserService userService, BCryptPasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    @PostMapping(SecurityConstants.CURRENT_USER_URL)
    public ResponseEntity<UserDTO> getUserFromToken(Authentication authentication, Principal principal) {
        UserDTO user = null;
        if (authentication != null) user = userService.mapUserToDTO(userService.findByEmail(authentication.getName()));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping(SecurityConstants.SIGN_UP_URL)
    public void signUp(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
    }
}
