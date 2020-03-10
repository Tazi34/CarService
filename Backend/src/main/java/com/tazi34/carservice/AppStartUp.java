package com.tazi34.carservice;

import com.tazi34.carservice.authorization.AuthorizationConstants;
import com.tazi34.carservice.authorization.roles.Role;
import com.tazi34.carservice.authorization.roles.RoleRepository;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class AppStartUp implements ApplicationListener<ApplicationReadyEvent> {

    /**
     * This event is executed as late as conceivably possible to indicate that
     * the application is ready to service requests.
     */

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    BCryptPasswordEncoder encoder;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        var adminMail = "admin@admin.com";
        var admins = userRepository.findAllByEmail("admin@admin.com");
        if (admins.isEmpty()) {
            User admin = new User();
            admin.setEmail(adminMail);
            admin.setPassword(encoder.encode("admin"));
            var roles = new ArrayList<Role>();
            var adminRole = roleRepository.findByName(AuthorizationConstants.ROLE_ADMIN);
            var userRole = roleRepository.findByName(AuthorizationConstants.ROLE_USER);

            roles.add(adminRole);
            roles.add(userRole);
            admin.setRoles(roles);
            userRepository.save(admin);
        }

        return;
    }
}