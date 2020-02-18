package pw.react.carly.bookingUserInfo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingUserInfoService {

    private BookingUserInfoRepository bookingUserInfoRepository;

    @Autowired
    public BookingUserInfoService(BookingUserInfoRepository bookingUserInfoRepository) {
        this.bookingUserInfoRepository = bookingUserInfoRepository;
    }

    public BookingUserInfo updateBookingUserInfo(BookingUserInfo bookingUserInfo){
        if(bookingUserInfoRepository.existsById(bookingUserInfo.getId())) {
            bookingUserInfoRepository.save(bookingUserInfo);
            return bookingUserInfoRepository.save(bookingUserInfo);
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }

    public BookingUserInfo deleteBookingUserInfo(BookingUserInfo bookingUserInfo){
        if(bookingUserInfoRepository.existsById(bookingUserInfo.getId())) {
            bookingUserInfoRepository.delete(bookingUserInfo);
            return bookingUserInfo;
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }

    public BookingUserInfo addBookingUserInfo(BookingUserInfoDTO bookingUserInfoDTO){
        String email = bookingUserInfoDTO.getEmail();
        String name = bookingUserInfoDTO.getName();
        String surname = bookingUserInfoDTO.getSurname();

        List<BookingUserInfo> infosFound = bookingUserInfoRepository.findAllByEmail(bookingUserInfoDTO.getEmail());
        BookingUserInfo entity = null;
        if(infosFound.isEmpty()) {
            entity = new BookingUserInfo(name, surname, email);
            bookingUserInfoRepository.save(entity);
        }
        else {
            boolean infoAlreadyInDb = false;

            for (BookingUserInfo info : infosFound) {
                //CHECK IF MATCHES
                if (info.getEmail().equals(email) && info.getName().equals(name) && info.getSurname().equals(surname)) {
                    entity = info;
                    infoAlreadyInDb = true;
                }
            }
            if (!infoAlreadyInDb) {
                entity = new BookingUserInfo(name, surname, email);
                bookingUserInfoRepository.save(entity);
            }
        }
        return entity;
    }

    public BookingUserInfo getBookingUserInfo(Long id){
        if(bookingUserInfoRepository.existsById(id)) {
            return bookingUserInfoRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }
}
