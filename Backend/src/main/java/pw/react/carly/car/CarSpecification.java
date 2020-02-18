package pw.react.carly.car;

import org.springframework.data.jpa.domain.Specification;
import pw.react.carly.status.Status;

import java.util.List;
import java.util.stream.Collectors;

public class CarSpecification {
    public static Specification<Car> bySeats(int seats){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.seats),seats);
        };
    }
    public static Specification<Car> byYear(int year){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.year),year);
        };
    }

    public static Specification<Car> byMake(String make){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.make),make);
        };
    }



    public static Specification<Car> isNotDeniedByStatuses(List<Status> statuses){
        return (root,query,criteriaBuilder) -> {
            if(statuses == null || statuses.isEmpty()){
                //always true predicate
                return criteriaBuilder.conjunction();
            }else{
                List<Long>  unavailableCarsIds  = statuses.stream().map((el) -> el.getCar().getId()).collect(Collectors.toList());
                return criteriaBuilder.in(root.get("id")).value(unavailableCarsIds).not();
            }
        };
    }
    public static Specification<Car> isDeniedByStatuses(List<Status> statuses){
        return Specification.not(isNotDeniedByStatuses(statuses));
    }
    public static Specification<Car> isActive(boolean isActive){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.isActive),isActive);
        };
    }






}
