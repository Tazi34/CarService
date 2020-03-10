package tests.authentication.service;

import com.tazi34.carservice.authentication.AuthenticationService;
import com.tazi34.carservice.user.User;
import com.tazi34.carservice.user.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GetCurrentUserTests {

    @Mock
    UserService userService;
    @InjectMocks
    AuthenticationService authenticationService;

    @Test
    public void givenUnauthenticatedUser_returnNull() {
        Authentication authentication = null;

        var currentUser = authenticationService.getCurrentUser(authentication);
        Assert.assertNull(currentUser);
    }

    @Test
    public void givenAuthenticatedUser_returnUser() {


        var mockedUserEmail = "mocked@mail.com";
        var mockedUser = mock(User.class);
        when(mockedUser.getId()).thenReturn(1l);
        when(mockedUser.getEmail()).thenReturn(mockedUserEmail);

        var mockedAuthentication = mock(Authentication.class);
        when(mockedAuthentication.getName()).thenReturn(mockedUserEmail);

        when(userService.findByEmail(mockedUserEmail)).thenReturn(mockedUser);


        var currentUser = authenticationService.getCurrentUser(mockedAuthentication);
        Assert.assertNotNull(currentUser);
        Assert.assertEquals(mockedUserEmail, currentUser.getEmail());
    }
}
