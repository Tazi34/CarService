package pw.react.carly.status;

import org.springframework.data.jpa.domain.Specification;
import pw.react.carly.car.Car_;

import java.util.Date;

public class StatusSpecifications {
    public static Specification<Status> byCarId(Long carID){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal( root.get(Status_.car).get(Car_.id),carID);
        };
    }
    public static Specification<Status> fromDateAfter(Date date){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(Status_.dateFrom),date);
        };
    }
    public static Specification<Status> fromDateBefore(Date date){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.lessThanOrEqualTo(root.get(Status_.dateFrom),date);
        };
    }

    public static Specification<Status> toDateAfter(Date date){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(Status_.dateTo),date);
        };
    }

    public static Specification<Status> toDateBefore(Date date){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.lessThanOrEqualTo(root.get(Status_.dateTo),date);
        };
    }
    public static Specification<Status> isType(StatusType type){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Status_.type),type);
        };
    }
    public static Specification<Status> isBetweenDate(Date from,Date to){
        return fromDateAfter(from).and(toDateBefore(to));
    }

    public static Specification<Status> isUnavailableOrBooked(){
        return isType(StatusType.BOOKED).or(isType(StatusType.UNAVAILABLE));
    }

    public static Specification<Status> collidesWithDateSpan(Date start, Date end){
                //  <start  |from---------to| end>|
        return (toDateAfter(end).and(fromDateBefore(end)))
                //  |from---- <start-----to| end>|
                .or(toDateBefore(end).and(toDateAfter(start)));
    }
    

}
