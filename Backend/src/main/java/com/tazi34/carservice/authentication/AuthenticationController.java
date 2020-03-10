package com.tazi34.carservice.authentication;

import com.tazi34.carservice.config.security.SecurityConstants;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(SecurityConstants.CURRENT_USER_ENDPOINT)
    public ResponseEntity<UserDTO> getUserFromToken(Authentication authentication) {
        return ResponseEntity.ok().body(authenticationService.getCurrentUser(authentication));
    }

    @PostMapping(SecurityConstants.SIGN_UP_ENDPOINT)
    public ResponseEntity<UserDTO> signUp(@RequestBody User user) {
        return ResponseEntity.ok().body(authenticationService.registerUser(user));
    }
}
