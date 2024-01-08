package com.igorszalas.fitDiet.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.igorszalas.fitDiet.models.Recipe;

public interface RecipeRepository extends MongoRepository<Recipe, String>{

    List<Recipe> findByDishType(String string);
}
