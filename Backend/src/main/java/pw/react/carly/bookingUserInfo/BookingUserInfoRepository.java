package pw.react.carly.bookingUserInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingUserInfoRepository extends JpaRepository<BookingUserInfo, Long> {
	
	List<BookingUserInfo> findAllByEmail(String email);
}