package utilities;

import com.tazi34.carservice.clientInfo.ClientInfoDTO;
import com.tazi34.carservice.clientInfo.address.AddressDTO;

public class DummyValues {
    public static AddressDTO getAddressDTO() {
        return new AddressDTO("TEST", "TEST", "TEST", "TEST", "TEST");
    }

    public static ClientInfoDTO getDummyClientInfoDTO() {
        return new ClientInfoDTO("TEST", "TEST", "TEST@TEST.COM", "TEST", "123456789", getAddressDTO());
    }

}
