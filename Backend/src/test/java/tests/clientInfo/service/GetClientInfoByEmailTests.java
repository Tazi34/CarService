package tests.clientInfo.service;

import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoRepository;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
public class GetClientInfoByEmailTests {
    @Mock
    private ClientInfoRepository repository;

    @InjectMocks
    private ClientInfoService clientInfoService;

    @Test(expected = ResourceNotFoundException.class)
    public void givenNonExistingEmail_throw404() {
        //GIVEN
        var email = "nonexisting@mail.com";
        when(repository.findAllByEmail(email)).thenReturn(new ArrayList<>());

        //WHEN
        clientInfoService.getClientInfoByEmail(email);

        //THEN
    }

    @Test
    public void givenExistingMail_returnClientInfo() {
        //GIVEN
        var email = "existing@mail.com";
        var client = Mockito.mock(ClientInfo.class);

        when(repository.findAllByEmail(email)).thenReturn(Arrays.asList(client));

        //WHEN
        var clientInfo = clientInfoService.getClientInfoByEmail(email);

        //THEN
        Assert.assertEquals(clientInfo,client);
    }
}
