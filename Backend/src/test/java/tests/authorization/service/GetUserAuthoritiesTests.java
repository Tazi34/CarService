package tests.authorization.service;

import com.tazi34.carservice.authorization.AuthorizationService;
import com.tazi34.carservice.authorization.privileges.Privilege;
import com.tazi34.carservice.authorization.roles.Role;
import com.tazi34.carservice.authorization.roles.RoleRepository;
import com.tazi34.carservice.user.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GetUserAuthoritiesTests {

    @Mock
    RoleRepository roleRepository;

    @InjectMocks
    AuthorizationService authorizationService;


    @Test
    public void givenUserWithoutRoles_returnEmptyList() {
        //GIVEN
        var mockedUser = mock(User.class);
        var emptyRoleList = new ArrayList<Role>();
        when(mockedUser.getRoles()).thenReturn(emptyRoleList);

        //WHEN
        var authorities = authorizationService.getUserAuthorities(mockedUser);

        //THEN
        Assert.assertTrue(authorities.isEmpty());
    }

    @Test
    public void givenUserWithRoles_returnListOfGrantedAuthorities() {
        //GIVEN
        var user = mock(User.class);
        List<String> expectedAuthoritiesNames = new ArrayList<>();

        //mock roles
        List<Role> roles = new ArrayList<>();
        int rolesSize = 2;

        for (int i = 0; i < rolesSize; i++) {
            var roleName = "ROLE " + i;
            var role = mock(Role.class);
            when(role.getName()).thenReturn(roleName);
            roles.add(role);
            expectedAuthoritiesNames.add(roleName);
        }

        var privileges = new ArrayList<Privilege>();
        int privilegesSize = 3;

        //mock privileges
        for (int i = 0; i < privilegesSize; i++) {
            var privilege = mock(Privilege.class);
            var privilegeName = "TEST" + i;
            when(privilege.getName()).thenReturn(privilegeName);
            privileges.add(privilege);
            expectedAuthoritiesNames.add(privilegeName);
        }
        when(user.getRoles()).thenReturn(roles);

        //one role with 3x privileges, one without any
        when(roles.get(0).getPrivileges()).thenReturn(privileges);

        //WHEN
        var authorities = authorizationService.getUserAuthorities(user);

        //THEN
        Assert.assertEquals(privilegesSize + rolesSize, authorities.size());
        var authoritiesNames = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        Assert.assertEquals(expectedAuthoritiesNames, authoritiesNames);
    }
}
