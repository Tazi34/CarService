package com.tazi34.carservice.clientInfo;


import com.tazi34.carservice.clientInfo.address.Address;
import com.tazi34.carservice.clientInfo.address.AddressDTO;
import com.tazi34.carservice.clientInfo.address.AddressRepository;
import com.tazi34.carservice.exceptions.notFound.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientInfoService {
    private ClientInfoRepository clientInfoRepository;
    private AddressRepository addressRepository;
    private ModelMapper modelMapper;

    @Autowired
    public ClientInfoService(ClientInfoRepository clientInfoRepository, AddressRepository addressRepository, ModelMapper modelMapper) {
        this.clientInfoRepository = clientInfoRepository;
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
    }

    public ClientInfo updateClientInfo(ClientInfo clientInfo) {
        if (clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.save(clientInfo);
            return clientInfoRepository.save(clientInfo);
        }
        throw new ResourceNotFoundException(ClientInfo.class);
    }

    public ClientInfo deleteClientInfo(ClientInfo clientInfo) {
        if (clientInfoRepository.existsById(clientInfo.getId())) {
            clientInfoRepository.delete(clientInfo);
            return clientInfo;
        }
        throw new ResourceNotFoundException(ClientInfo.class);
    }

    public ClientInfo updateClientInfo(ClientInfoDTO clientInfoDTO) {
        var clientInfo = modelMapper.map(clientInfoDTO, ClientInfo.class);
        var address = modelMapper.map(clientInfoDTO.getAddress(), Address.class);
        addressRepository.save(address);
        clientInfo.setAddress(addressRepository.save(address));
        return clientInfoRepository.save(clientInfo);
    }

    public ClientInfo getClientInfoByEmail(String email) {
        var clientInfos = clientInfoRepository.findAllByEmail(email);
        if (clientInfos.isEmpty()) {
            throw new ResourceNotFoundException(ClientInfo.class);
        }
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
        throw new ResourceNotFoundException(ClientInfo.class);
    }

    private ClientInfoDTO mapClientToDTO(ClientInfo clientInfo) {
        var clientInfoDto = modelMapper.map(clientInfo, ClientInfoDTO.class);
        clientInfoDto.address = modelMapper.map(clientInfo.getAddress(), AddressDTO.class);
        return clientInfoDto;
    }
}
