package tests.authentication.service;

import com.tazi34.carservice.Exceptions.UserAlreadyExistsException;
import com.tazi34.carservice.authentication.AuthenticationService;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserService;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class RegisterUserTests {

    @Mock
    UserService userService;

    @InjectMocks
    AuthenticationService authenticationService;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Test
    public void givenExistingUser_throwUserAlreadyExistsException(){
        var mockedUser = mock(User.class);
        when(userService.userExists(mockedUser)).thenReturn(true);

        expectedException.expect(UserAlreadyExistsException.class);
        authenticationService.registerUser(mockedUser);
    }

    @Test
    public void givenNonExistingUser_returnNewUser(){
        var mockedUser = mock(User.class);
        var testEmail = "test@mail.com";
        var id = 1l;
        when(userService.userExists(mockedUser)).thenReturn(false);
        when(mockedUser.getEmail()).thenReturn(testEmail);
        when(mockedUser.getId()).thenReturn(id);
        when(userService.save(mockedUser)).thenReturn(mockedUser);

        var registeredUser = authenticationService.registerUser(mockedUser);

        Assert.assertNotNull(registeredUser);
        Assert.assertEquals(testEmail,registeredUser.getEmail());
        Assert.assertEquals(id, registeredUser.getId());
    }

}
