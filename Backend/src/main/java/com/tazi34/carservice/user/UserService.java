package com.tazi34.carservice.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //    public User updateAdmin(User admin){
//        if(userRepository.existsById(admin.getId())) {
//            userRepository.save(admin);
//            return userRepository.save(admin);
//        }
//
//        throw new ResourceNotFoundException("User not found");
//    }
//
    public UserDTO deleteAdmin(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            userRepository.delete(user);
            return new UserDTO(user.getEmail(), user.getId());
        }
        throw new ResourceNotFoundException("User not found");
    }

    public UserDTO getAdmin(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            return new UserDTO(user.getEmail(), user.getId());
        }
        throw new ResourceNotFoundException("User not found");
    }

    public List<UserDTO> findByEmail(String email) {
        List<UserDTO> admins =
                userRepository.findAdminByEmail(email).stream().map((user) -> new UserDTO(user.getEmail(),
                        user.getId())).collect(Collectors.toList());
        return admins;
    }

    public List<UserDTO> getAllAdmins() {
        return userRepository.findAll().stream().map((user) -> new UserDTO(user.getEmail(), user.getId())).collect(Collectors.toList());
    }

    //for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        List<User> users = userRepository.findAdminByEmail(email);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        User user = users.get(0);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), emptyList());
    }
}
