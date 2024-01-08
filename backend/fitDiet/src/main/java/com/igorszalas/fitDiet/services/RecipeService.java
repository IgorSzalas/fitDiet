package com.igorszalas.fitDiet.services;

import java.util.List;

import com.igorszalas.fitDiet.models.Recipe;

public interface RecipeService {

    public List<Recipe> getRecipesByUserFavouriteIngredients(String userID);

    public List<Recipe> getRecipesByUserDislikedIngredients(String userID);

    public List<Recipe> getRecipesByUserPreferences(String userID);
}
