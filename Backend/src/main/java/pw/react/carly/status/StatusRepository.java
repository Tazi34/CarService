package pw.react.carly.status;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import pw.react.carly.car.Car;

import java.util.List;


public interface StatusRepository extends PagingAndSortingRepository<Status, Long>, JpaSpecificationExecutor<Status> {
    List<Status> deleteAllByCar(Car car);

}
