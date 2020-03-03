package com.tazi34.carservice.user;


import com.tazi34.carservice.Exceptions.DuplicateUserMailException;
import org.modelmapper.ModelMapper;
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
    private ModelMapper mapper = new ModelMapper();

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            userRepository.delete(user);
            return new UserDTO(user.getId(),user.getEmail());
        }
        throw new ResourceNotFoundException("User not found");
    }

    public UserDTO getUser(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            return new UserDTO( user.getId(),user.getEmail());
        }
        throw new ResourceNotFoundException("User not found");
    }

    public UserDTO findByEmail(String email) {

        List<User> users =userRepository.findAllByEmail(email);
        if(users.size() > 1)
            throw new DuplicateUserMailException(email);
        if(users.isEmpty())
            return null;

        return mapUserToDTO(users.get(0));
    }

    public List<UserDTO> getAllUsers() {
        return mapUsersToDTOs(userRepository.findAll());
    }

    //for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        List<User> users = userRepository.findAllByEmail(email);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        User user = users.get(0);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), emptyList());
    }

    private List<UserDTO> mapUsersToDTOs(List<User> users){
        return users.stream().map((user) -> mapUserToDTO(user)).collect(Collectors.toList());
    }
    private UserDTO mapUserToDTO(User user)
    {
        return new UserDTO(user.getId(),user.getEmail());
    }
    public User save(User user){
        return userRepository.save(user);
    }
}
