package com.tazi34.carservice.car;

import com.tazi34.carservice.status.Status;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class CarSpecification {
    public static Specification<Car> bySeats(Integer seats) {
        if (seats == null) {
            return emptySpecification();
        }
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.seats), seats);
        };
    }

    public static Specification<Car> byYear(Integer year) {
        if (year == null) {
            return emptySpecification();
        }
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.year), year);
        };
    }

    public static Specification<Car> byMake(String make) {
        if (make == null || make.isEmpty()) {
            return emptySpecification();
        }
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.make), make);
        };
    }

    public static Specification<Car> isNotDeniedByStatuses(List<Status> statuses) {
        return (root, query, criteriaBuilder) -> {
            if (statuses == null || statuses.isEmpty()) {
                //always true predicate
                return criteriaBuilder.conjunction();
            } else {
                List<Long> unavailableCarsIds =
                        statuses.stream().map((el) -> el.getCar().getId()).collect(Collectors.toList());
                return criteriaBuilder.in(root.get("id")).value(unavailableCarsIds).not();
            }
        };
    }

    public static Specification<Car> isDeniedByStatuses(List<Status> statuses) {
        return Specification.not(isNotDeniedByStatuses(statuses));
    }

    public static Specification<Car> isActive(Boolean isActive) {
        if (isActive == null) {
            return emptySpecification();
        }
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.active), isActive);
        };
    }


    public static Specification<Car> bySpotId(Integer spotId) {
        if (spotId == null) {
            return emptySpecification();
        }
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.spot).get("id"), spotId);
        };
    }

    private static Specification<Car> emptySpecification() {
        return Specification.where(null);
    }
}
