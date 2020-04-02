package com.tazi34.carservice.user;


import com.tazi34.carservice.authorization.AuthorizationService;
import com.tazi34.carservice.exceptions.duplicateEntity.DuplicateUserMailException;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final AuthorizationService authService;

    @Autowired
    public UserService(UserRepository userRepository, AuthorizationService authorizationService) {
        this.userRepository = userRepository;
        this.authService = authorizationService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public UserDTO deleteUser(Long id) {
        var user = findUser(id);
        userRepository.delete(user);
        return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
    }

    public User findUser(long id) {
        var optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else throw new ResourceNotFoundException(User.class);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    public UserDTO getUser(Long id) {
        User user = findUser(id);
        return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
    }

    public User findByEmail(String email) {
        List<User> users = userRepository.findAllByEmail(email);
        if (users.size() > 1) throw new DuplicateUserMailException(email);
        if (users.isEmpty()) throw new ResourceNotFoundException(User.class);
        return users.get(0);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> getAllUsers() {
        return mapUsersToDTOs(userRepository.findAll());
    }

    //for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user;
        try {
            user = findByEmail(email);
        } catch (ResourceNotFoundException exception) {
            throw new UsernameNotFoundException(email);
        }
        var authorities = authService.getUserAuthorities(user);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                user.isEnabled(), true, true, true, authorities);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean userExists(String email) {
        return !userRepository.findAllByEmail(email).isEmpty();
    }

    private List<UserDTO> mapUsersToDTOs(List<User> users) {
        return users.stream().map(this::mapUserToDTO).collect(Collectors.toList());
    }

    private UserDTO mapUserToDTO(User user) {
        return new UserDTO(user.getId(), user.getEmail(), user.getRoles());
    }
}
