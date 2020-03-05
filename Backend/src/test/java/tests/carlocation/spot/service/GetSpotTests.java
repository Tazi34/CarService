package tests.carlocation.spot.service;

import com.tazi34.carservice.carlocation.spot.Spot;
import com.tazi34.carservice.carlocation.spot.SpotRepository;
import com.tazi34.carservice.carlocation.spot.SpotService;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class GetSpotTests {
    @Mock
    SpotRepository spotRepository;
    @Rule
    public ExpectedException expectedException = ExpectedException.none();
    @InjectMocks
    SpotService spotService;

    @Test
    public void givenWrongId_throwNotFound(){
        when(spotRepository.findById(any())).thenReturn(Optional.empty());

        expectedException.expect(ResourceNotFoundException.class);
        spotService.getSpot(1);
    }
    @Test
    public void givenProperId_returnSpot(){
        var mockedSpot = mock(Spot.class);
        when(spotRepository.findById(any())).thenReturn(Optional.of(mockedSpot));

        var spot = spotService.getSpot(1);
        Assert.assertEquals(mockedSpot,spot);
    }


}
