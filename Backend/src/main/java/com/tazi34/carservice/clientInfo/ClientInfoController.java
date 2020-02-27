package com.tazi34.carservice.clientInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clientinfos")
public class ClientInfoController {


    private ClientInfoService clientInfoService;
    private ClientInfoRepository clientInfoRepository;

    @Autowired
    public ClientInfoController(ClientInfoService clientInfoService, ClientInfoRepository clientInfoRepository) {
        this.clientInfoService = clientInfoService;
        this.clientInfoRepository = clientInfoRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientInfo> getClientInfo(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(clientInfoService.getClientInfo(id));
    }
    @GetMapping("")
    public ResponseEntity<List<ClientInfo>> getAllClientInfos(){
        return ResponseEntity.ok().body(clientInfoRepository.findAll());
    }

    @DeleteMapping("")
    public ResponseEntity deleteClientInfo(@RequestBody @Valid ClientInfo clientInfo){
        return ResponseEntity.ok().body(clientInfoService.deleteClientInfo(clientInfo));
    }
    @PatchMapping("")
    public ResponseEntity<ClientInfo> updateClientInfo(@RequestBody @Valid ClientInfo clientInfo){
        return ResponseEntity.ok().body(clientInfoService.updateClientInfo(clientInfo));
    }
    @PutMapping(path = "")
    public ResponseEntity<ClientInfo> updateWholeClientInfo(@RequestBody @Valid ClientInfo updatedClientInfo) {
        return ResponseEntity.ok().body(clientInfoRepository.save(updatedClientInfo));
    }

    @PostMapping("")
    public ResponseEntity<ClientInfo> addClientInfo(@RequestBody @Valid ClientInfo clientInfo) {
            return ResponseEntity.ok().body(clientInfoRepository.save(clientInfo));
    }
}
