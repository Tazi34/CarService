package com.tazi34.carservice.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        encoder = bCryptPasswordEncoder;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getAdmin(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.getAdmin(id));
    }

    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAdmins(@RequestParam(required = false, name = "email") String email) {
        List<UserDTO> admins;
        if (email != null) {
            admins = userService.findByEmail(email);
        } else {
            admins = userService.getAllAdmins();
        }
        return ResponseEntity.ok().body(admins);
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAdmin(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.deleteAdmin(id));
    }
//    @PatchMapping("")
//    public ResponseEntity<User> updateAdmin(@RequestBody @Valid User User){
//        return ResponseEntity.ok().body(adminService.updateAdmin(User));
//    }
//    @PutMapping(path = "")
//    public ResponseEntity<User> updateWholeAdmin(@RequestBody @Valid User updatedAdmin) {
//        return ResponseEntity.ok().body(userRepository.save(updatedAdmin));
//    }

}
