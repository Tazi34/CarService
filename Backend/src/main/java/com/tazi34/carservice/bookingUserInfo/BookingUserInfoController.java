package com.tazi34.carservice.bookingUserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/bookinguserinfos")
public class BookingUserInfoController {


    private BookingUserInfoService bookingUserInfoService;
    private BookingUserInfoRepository bookingUserInfoRepository;

    @Autowired
    public BookingUserInfoController(BookingUserInfoService bookingUserInfoService, BookingUserInfoRepository bookingUserInfoRepository) {
        this.bookingUserInfoService = bookingUserInfoService;
        this.bookingUserInfoRepository = bookingUserInfoRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingUserInfo> getBookingUserInfo(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(bookingUserInfoService.getBookingUserInfo(id));
    }
    @GetMapping("")
    public ResponseEntity<List<BookingUserInfo>> getAllBookingUserInfos(){
        return ResponseEntity.ok().body(bookingUserInfoRepository.findAll());
    }

    @DeleteMapping("")
    public ResponseEntity deleteBookingUserInfo(@RequestBody @Valid BookingUserInfo bookingUserInfo){
        return ResponseEntity.ok().body(bookingUserInfoService.deleteBookingUserInfo(bookingUserInfo));
    }
    @PatchMapping("")
    public ResponseEntity<BookingUserInfo> updateBookingUserInfo(@RequestBody @Valid BookingUserInfo bookingUserInfo){
        return ResponseEntity.ok().body(bookingUserInfoService.updateBookingUserInfo(bookingUserInfo));
    }
    @PutMapping(path = "")
    public ResponseEntity<BookingUserInfo> updateWholeBookingUserInfo(@RequestBody @Valid BookingUserInfo updatedBookingUserInfo) {
        return ResponseEntity.ok().body(bookingUserInfoRepository.save(updatedBookingUserInfo));
    }

    @PostMapping("")
    public ResponseEntity<BookingUserInfo> addBookingUserInfo(@RequestBody @Valid BookingUserInfo bookingUserInfo) {
            return ResponseEntity.ok().body(bookingUserInfoRepository.save(bookingUserInfo));
    }
}
