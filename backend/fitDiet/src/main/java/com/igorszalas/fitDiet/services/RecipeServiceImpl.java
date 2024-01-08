package com.igorszalas.fitDiet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igorszalas.fitDiet.models.Recipe;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.RecipeRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

// @AllArgsConstructor
// @NoArgsConstructor
@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;

    public List<Recipe> getRecipesByUserFavouriteIngredients(String userID) {
        User user = userRepository.findUserById(userID);

        List<String> userFavouriteIngredients = user.getFavouriteIngredients();
        List<Recipe> recipes = recipeRepository.findAll();
        List<Recipe> userProposedDishes = new ArrayList<Recipe>();

        for (String ingredient : userFavouriteIngredients) {
            for (Recipe recipe : recipes) {
                List<String> dishIngredients = recipe.getIngredients();
                for (String dishIngredient : dishIngredients) {
                    if (ingredient.equals(dishIngredient)) {
                        userProposedDishes.add(recipe);
                    }
                }
            }
        }

        if (userProposedDishes.isEmpty()) {
            throw new Error("Your proposed dishes list is empty");
        }

        System.out.println("userProposedDishes: " + userProposedDishes);
        return userProposedDishes;
    }

    public List<Recipe> getRecipesByUserDislikedIngredients(String userID) {
        User user = userRepository.findUserById(userID);

        List<String> userDislikedIngredients = user.getDislikedIngredients();
        List<Recipe> recipes = recipeRepository.findAll();
        List<Recipe> userDislikedDishes = new ArrayList<Recipe>();

        for (String dislikedIngredient : userDislikedIngredients) {
            for (Recipe recipe : recipes) {
                List<String> dishIngredients = recipe.getIngredients();
                for (String dishIngredient : dishIngredients) {
                    if (dislikedIngredient.equals(dishIngredient)) {
                        userDislikedDishes.add(recipe);
                    }
                }
            }
        }
        System.out.println("userDislikedDishes: " + userDislikedDishes);
        return userDislikedDishes;
    }

    public List<Recipe> getRecipesByUserPreferences(String userID) {

        List<Recipe> userFavoriteDishes = this.getRecipesByUserFavouriteIngredients(userID);
        List<Recipe> userDislikedDishes = this.getRecipesByUserDislikedIngredients(userID);
        List<Recipe> userDishesByUserPreferences = new ArrayList<>();
        List<Recipe> dishesWithoutGluten = recipeRepository.findByDishType("gluten-free");
        List<Recipe> dishesWithoutLactose = recipeRepository.findByDishType("lactose-free");
        List<Recipe> dishesWithoutMeat = recipeRepository.findByDishType("vegan");
        User user = userRepository.findUserById(userID);

        if (!userDislikedDishes.isEmpty()) {
            userFavoriteDishes.removeAll(userDislikedDishes);
            userDishesByUserPreferences = userFavoriteDishes;
            if (!user.isDishesWithGluten()) {
                userDishesByUserPreferences.removeAll(dishesWithoutGluten);
            }
            if (!user.isDishesWithLactose()) {
                userDishesByUserPreferences.removeAll(dishesWithoutLactose);
            }
            if (!user.isDishesWithMeat()) {
                userDishesByUserPreferences.removeAll(dishesWithoutMeat);
            }
        } else {
            throw new Error("userDislikedDishes is empty!");
        }

        System.out.println("userDishesByUserPreferences: " + userDishesByUserPreferences);
        return userDishesByUserPreferences;
    }
}
