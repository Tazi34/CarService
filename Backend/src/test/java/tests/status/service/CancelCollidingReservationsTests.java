package tests.status.service;

import com.tazi34.carservice.carReservation.ReservationDateChecker;
import com.tazi34.carservice.status.Status;
import com.tazi34.carservice.status.StatusRepository;
import com.tazi34.carservice.status.StatusService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.tazi34.carservice.status.StatusType.BOOKED;
import static com.tazi34.carservice.status.StatusType.BOOKINGCANCELED;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class CancelCollidingReservationsTests {
    @Mock
    StatusRepository statusRepository;

    @Mock
    ReservationDateChecker reservationDateChecker;

    @InjectMocks
    StatusService statusService;

    @Test
    public void givenListOfBookedStatuses_returnsListOfCancelledBookings() {
        //GIVEN
        List<Status> bookedStatuses = new ArrayList<>();
        int bookingsCount = 5;

        for (int i = 0; i < bookingsCount; i++) {
            var booking = mock(Status.class);
            when(booking.getType()).thenCallRealMethod();
            doCallRealMethod().when(booking).setType(any());
            booking.setType(BOOKED);
            bookedStatuses.add(booking);
        }
        when(statusRepository.findAll(any(Specification.class))).thenReturn(bookedStatuses);
        when(statusRepository.saveAll(any())).then(returnsFirstArg());

        //WHEN
        var canceledStatuses = statusService.cancelCollidingReservations(mock(Date.class), mock(Date.class), 1);

        //THEN
        canceledStatuses.forEach(status -> Assert.assertEquals(BOOKINGCANCELED, status.getType()));
    }
}
