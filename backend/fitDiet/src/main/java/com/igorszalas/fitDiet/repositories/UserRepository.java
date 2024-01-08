package com.igorszalas.fitDiet.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import com.igorszalas.fitDiet.models.Dish;
import com.igorszalas.fitDiet.models.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findUserById(String id);

    List<User> findUserByUserType();

    List<User> findUserByUserPosts();

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("{userID : ?0}")
    @Update("{$push:{ plannedDishes: ?1 }}")
    void addDishToUser(String userID, Dish newDish);
}