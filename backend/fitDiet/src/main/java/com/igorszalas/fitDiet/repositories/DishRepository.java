package com.igorszalas.fitDiet.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.igorszalas.fitDiet.models.Dish;
import java.util.Optional;

public interface DishRepository extends MongoRepository<Dish, String> {

    Optional<Dish> findByDishTitleAndDateOfConsumption(String dishTitle, String dateOfConsumption);
}
