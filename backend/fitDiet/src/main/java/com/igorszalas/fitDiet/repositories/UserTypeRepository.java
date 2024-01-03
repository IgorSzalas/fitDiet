package com.igorszalas.fitDiet.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.igorszalas.fitDiet.models.UserType;
import com.igorszalas.fitDiet.models.UserTypeEnum;

import java.util.Optional;


public interface UserTypeRepository extends MongoRepository<UserType, String> {

    Optional<UserType> findByUserTypeName(UserTypeEnum userTypeName);

}
