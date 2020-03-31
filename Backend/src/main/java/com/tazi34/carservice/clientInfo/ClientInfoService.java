package com.tazi34.carservice.clientInfo;


import com.tazi34.carservice.clientInfo.address.Address;
import com.tazi34.carservice.clientInfo.address.AddressDTO;
import com.tazi34.carservice.clientInfo.address.AddressRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ClientInfoService {

    private ClientInfoRepository clientInfoRepository;
    private AddressRepository addressRepository;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public ClientInfoService(ClientInfoRepository clientInfoRepository, AddressRepository addressRepository) {
        this.clientInfoRepository = clientInfoRepository;
        this.addressRepository = addressRepository;
    }

    public ClientInfo updateClientInfo(ClientInfo clientInfo) {
        if (clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.save(clientInfo);
            return clientInfoRepository.save(clientInfo);
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }

    public ClientInfo deleteClientInfo(ClientInfo clientInfo) {
        if (clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.delete(clientInfo);
            return clientInfo;
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }

    public ClientInfo addClientInfo(ClientInfoDTO clientInfoDTO) {
//        String email = clientInfoDTO.getEmail();
//        String name = clientInfoDTO.getName();
//        String surname = clientInfoDTO.getSurname();
//
//        List<ClientInfo> infosFound = clientInfoRepository.findAllByEmail(clientInfoDTO.getEmail());
//        ClientInfo entity = null;
//        if(infosFound.isEmpty()) {
//            entity = new ClientInfo(name, surname, email);
//            clientInfoRepository.save(entity);
//        }
//        else {
//            boolean infoAlreadyInDb = false;
//
//            for (ClientInfo info : infosFound) {
//                //CHECK IF MATCHES
//                if (info.getEmail().equals(email) && info.getName().equals(name) && info.getSurname().equals
//                (surname)) {
//                    entity = info;
//                    infoAlreadyInDb = true;
//                }
//            }
//            if (!infoAlreadyInDb) {
//                entity = new ClientInfo(name, surname, email);
//                clientInfoRepository.save(entity);
//            }
//        }
        ClientInfo clientInfo = modelMapper.map(clientInfoDTO, ClientInfo.class);
        return clientInfoRepository.save(clientInfo);
    }

    public ClientInfo updateClientInfo(ClientInfoDTO clientInfoDTO) {
        ClientInfo clientInfo;
        Address address;
        if (clientInfoRepository.existsById(clientInfoDTO.getId())) {
            clientInfo = clientInfoRepository.getOne(clientInfoDTO.getId());

            clientInfo.setPid(clientInfoDTO.pid);
            clientInfo.setSurname(clientInfoDTO.surname);
            clientInfo.setPhoneNumber(clientInfoDTO.phoneNumber);
            clientInfo.setName(clientInfoDTO.name);
            clientInfo.setEmail(clientInfoDTO.email);

            var addressDTO = clientInfoDTO.getAddress();
            if (!addressRepository.existsById(addressDTO.getId())) {
                address = modelMapper.map(clientInfoDTO.getAddress(), Address.class);
                clientInfo.setAddress(addressRepository.save(address));
            }
        } else {
            address = modelMapper.map(clientInfoDTO.getAddress(), Address.class);
            clientInfo = modelMapper.map(clientInfoDTO, ClientInfo.class);
            clientInfo.setAddress(addressRepository.save(address));
        }

        return clientInfoRepository.save(clientInfo);
    }

    public ClientInfo getClientInfoByEmail(String email) {
        var clientInfos = clientInfoRepository.findAllByEmail(email);
        if (clientInfos.isEmpty()) return null;
        return clientInfos.get(0);
    }

    public ClientInfoDTO getClientInfoDTOByEmail(String email) {
        var clientInfos = clientInfoRepository.findAllByEmail(email);

        if (clientInfos.isEmpty()) return null;
        return mapClientToDTO(clientInfos.get(0));
    }

    public ClientInfo getClientInfo(Long id) {
        if (clientInfoRepository.existsById(id)) {
            return clientInfoRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("ClientInfo not found");
    }

    //TODO sprawdzic czy potrzebne
    public ClientInfoDTO mapClientToDTO(ClientInfo clientInfo) {
        var clientInfoDto = modelMapper.map(clientInfo, ClientInfoDTO.class);
        clientInfoDto.address = modelMapper.map(clientInfo.getAddress(), AddressDTO.class);
        return clientInfoDto;
    }
}
