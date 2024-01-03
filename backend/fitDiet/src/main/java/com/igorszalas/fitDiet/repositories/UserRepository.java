package com.igorszalas.fitDiet.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.igorszalas.fitDiet.models.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findUserById(String id);

    List<User> findUserByUserType();

    List<User> findUserByUserPosts();

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}