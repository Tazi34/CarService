package tests.clientInfo.service;

import com.tazi34.carservice.car.CarService;
import com.tazi34.carservice.clientInfo.ClientInfo;
import com.tazi34.carservice.clientInfo.ClientInfoRepository;
import com.tazi34.carservice.clientInfo.ClientInfoService;
import com.tazi34.carservice.clientInfo.address.AddressRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class GetClientInfoByEmailTests {

    @Configuration
    static class ClientInfoServiceTestContextConfiguration {
        @Bean
        public ClientInfoRepository clientInfoRepository() {
            return Mockito.mock(ClientInfoRepository.class);
        }
        @Bean
        public AddressRepository addressRepository() {
            return Mockito.mock(AddressRepository.class);
        }

        @Bean ClientInfoService clientInfoService(){
            return new ClientInfoService(clientInfoRepository(),addressRepository());
        }
    }

    @Autowired
    private ClientInfoRepository repository;

    @Autowired
    private ClientInfoService clientInfoService;

    @Test
    public void shouldReturnNullIfNonExistingEmail() {
        //GIVEN
        var email = "nonexisting@mail.com";
        when(repository.findAllByEmail(email)).thenReturn(new ArrayList<>());
        //WHEN
        var clientInfo = clientInfoService.getClientInfoByEmail(email);
        Assert.assertNull(clientInfo);
    }

    @Test
    public void shouldReturnClientInfo() {
        //GIVEN
        var email = "existing@mail.com";
        var client = Mockito.mock(ClientInfo.class);

        when(repository.findAllByEmail(email)).thenReturn(Arrays.asList(client));
        //WHEN
        var clientInfo = clientInfoService.getClientInfoByEmail(email);
        Assert.assertEquals(clientInfo,client);
    }
}
