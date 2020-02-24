package com.tazi34.carservice.clientInfo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientInfoService {

    private ClientInfoRepository clientInfoRepository;

    @Autowired
    public ClientInfoService(ClientInfoRepository clientInfoRepository) {
        this.clientInfoRepository = clientInfoRepository;
    }

    public ClientInfo updateClientInfo(ClientInfo clientInfo){
        if(clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.save(clientInfo);
            return clientInfoRepository.save(clientInfo);
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }

    public ClientInfo deleteClientInfo(ClientInfo clientInfo){
        if(clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.delete(clientInfo);
            return clientInfo;
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }

    public ClientInfo addClientInfo(ClientInfoDTO clientInfoDTO){
        String email = clientInfoDTO.getEmail();
        String name = clientInfoDTO.getName();
        String surname = clientInfoDTO.getSurname();

        List<ClientInfo> infosFound = clientInfoRepository.findAllByEmail(clientInfoDTO.getEmail());
        ClientInfo entity = null;
        if(infosFound.isEmpty()) {
            entity = new ClientInfo(name, surname, email);
            clientInfoRepository.save(entity);
        }
        else {
            boolean infoAlreadyInDb = false;

            for (ClientInfo info : infosFound) {
                //CHECK IF MATCHES
                if (info.getEmail().equals(email) && info.getName().equals(name) && info.getSurname().equals(surname)) {
                    entity = info;
                    infoAlreadyInDb = true;
                }
            }
            if (!infoAlreadyInDb) {
                entity = new ClientInfo(name, surname, email);
                clientInfoRepository.save(entity);
            }
        }
        return entity;
    }

    public ClientInfo getClientInfo(Long id){
        if(clientInfoRepository.existsById(id)) {
            return clientInfoRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }
}
