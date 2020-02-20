package com.tazi34.carservice.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/statuses")
public class StatusController {
    private StatusService statusService;
    private StatusRepository statusRepository;


    @Autowired
    public StatusController(StatusService statusService, StatusRepository statusRepository) {
        this.statusService = statusService;
        this.statusRepository = statusRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Status> getStatus(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(statusService.getStatus(id));
    }
    @GetMapping("")
    public Page<Status> getStatuses(
            @RequestParam(name="from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
            @RequestParam(name="to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to,
            @RequestParam(name="type",required = false) StatusType type,
            @RequestParam(name="carID",required = false) Long carID,
            @RequestParam(required = false, name="getall", defaultValue = "false") Boolean getAll,
            Pageable pageable
            ){
        Specification<Status> spec = Specification.where(null);
        if(from != null)
            spec = spec.and(StatusSpecifications.fromDateBefore(from));
        if(to != null)
            spec = spec.and(StatusSpecifications.toDateAfter(to));
        if(type != null)
            spec = spec.and(StatusSpecifications.isType(type));
        if(carID != null)
            spec = spec.and(StatusSpecifications.byCarId(carID));
        if(getAll)
            pageable = PageRequest.of(0,Integer.MAX_VALUE,pageable.getSort());

        return (statusRepository.findAll(spec,pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteStatus(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(statusService.deleteStatus(statusService.getStatus((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Status> updateStatus(@RequestBody @Valid Status status){
        return ResponseEntity.ok().body(statusService.updateStatus(status));
    }
    @PutMapping(path = "")
    public ResponseEntity<Status> updateWholeStatus(@RequestBody @Valid Status updatedStatus) {
        return ResponseEntity.ok().body(statusRepository.save(updatedStatus));
    }

    @PostMapping("")
    public ResponseEntity<Status> addUnavailableStatus(@RequestBody @Valid StatusDTO statusDTO) {
            return ResponseEntity.ok().body(statusService.saveUnavailableStatus(statusDTO));
    }
}
