package tests.authentication.service;

import com.tazi34.carservice.authentication.AuthenticationService;
import com.tazi34.carservice.authorization.AuthorizationConstants;
import com.tazi34.carservice.authorization.roles.Role;
import com.tazi34.carservice.authorization.roles.RoleRepository;
import com.tazi34.carservice.exceptions.UserAlreadyExistsException;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class RegisterUserTests {
    @Mock
    UserService userService;
    @Mock
    RoleRepository roleRepository;
    @Mock
    User mockedUser;
    @InjectMocks
    AuthenticationService authenticationService;


    @Before
    public void init() {
        var id = 1l;
        var testEmail = "test@mail.com";
        var testPassword = "password";

        when(mockedUser.getEmail()).thenReturn(testEmail);
        when(mockedUser.getId()).thenReturn(id);
        when(mockedUser.getPassword()).thenReturn(testPassword);
    }

    @Test(expected = UserAlreadyExistsException.class)
    public void givenExistingUser_throwUserAlreadyExistsException() {
        //GIVEN
        var mockedUser = mock(User.class);
        when(userService.userExists(mockedUser.getEmail())).thenReturn(true);

        //WHEN
        authenticationService.registerUser(mockedUser);

        //THEN
    }

    @Test
    public void givenNonExistingUser_returnNewUser() {
        //GIVEN
        when(userService.userExists(mockedUser.getEmail())).thenReturn(false);
        //returns same object that was passed to method
        when(userService.save(any())).then(AdditionalAnswers.returnsFirstArg());

        var mockedRole = mock(Role.class);
        when(roleRepository.findByName(AuthorizationConstants.ROLE_USER)).thenReturn(mockedRole);

        //WHEN
        var registeredUser = authenticationService.registerUser(mockedUser);

        //THEN
        Assert.assertNotNull(registeredUser);
        Assert.assertEquals(mockedUser.getEmail(), registeredUser.getEmail());
    }

    @Test
    public void createUser_givenUser_returnsUserWithEncodedPassword() {
        //GIVEN
        var mockedRole = mock(Role.class);
        when(roleRepository.findByName(AuthorizationConstants.ROLE_USER)).thenReturn(mockedRole);

        //WHEN
        var createdUser = authenticationService.createUser(mockedUser);

        //THEN
        Assert.assertNotEquals(mockedUser.getPassword(), createdUser.getPassword());
    }
}
