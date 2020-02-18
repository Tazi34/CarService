package pw.react.carly.car;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;




public interface CarRepository extends PagingAndSortingRepository<Car, Long>, JpaSpecificationExecutor {

}
