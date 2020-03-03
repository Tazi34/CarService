package com.tazi34.carservice.status;

import com.tazi34.carservice.clientInfo.ClientInfo;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.tazi34.carservice.car.Car;

import java.util.Collection;
import java.util.List;


public interface StatusRepository extends PagingAndSortingRepository<Status, Long>, JpaSpecificationExecutor<Status> {
    List<Status> deleteAllByCar(Car car);
    Collection<Status.OnlyReservationInfo> findByClientInfoIsIn(Collection<ClientInfo> clientInfos);

}
