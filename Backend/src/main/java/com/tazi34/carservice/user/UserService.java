package com.tazi34.carservice.user;


import com.tazi34.carservice.authorization.AuthorizationService;
import com.tazi34.carservice.exceptions.duplicateEntity.DuplicateUserMailException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;



@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private ModelMapper mapper = new ModelMapper();

    private final AuthorizationService authService;

    @Autowired
    public UserService(UserRepository userRepository, AuthorizationService authorizationService) {
        this.userRepository = userRepository;
        this.authService = authorizationService;
    }

    public UserDTO deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            userRepository.delete(user);
            return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
        }
        throw new ResourceNotFoundException(User.class);
    }

    public UserDTO getUser(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
        }
        throw new ResourceNotFoundException(User.class);
    }

    public User findByEmail(String email) {
        List<User> users = userRepository.findAllByEmail(email);
        if (users.size() > 1) throw new DuplicateUserMailException(email);
        if (users.isEmpty()) throw new ResourceNotFoundException(User.class);
        return users.get(0);
    }

    public List<UserDTO> getAllUsers() {
        return mapUsersToDTOs(userRepository.findAll());
    }

    //for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = findByEmail(email);
        if (user == null) throw new UsernameNotFoundException(email);
        var authorities = authService.getUserAuthorities(user);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                user.isEnabled(), true, true, true, authorities);
    }

    private List<UserDTO> mapUsersToDTOs(List<User> users) {
        return users.stream().map((user) -> mapUserToDTO(user)).collect(Collectors.toList());
    }

    private UserDTO mapUserToDTO(User user) {
        return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean userExists(String email) {
        return !userRepository.findAllByEmail(email).isEmpty();
    }
}
