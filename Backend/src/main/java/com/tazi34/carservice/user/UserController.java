package com.tazi34.carservice.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.getUser(id));
    }

    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getUsers(@RequestParam(required = false, name = "email") String email) {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }



    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.deleteUser(id));
    }

}
