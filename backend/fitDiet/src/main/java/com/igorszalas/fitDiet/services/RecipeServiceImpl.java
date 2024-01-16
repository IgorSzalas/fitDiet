package com.igorszalas.fitDiet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (!userFavouriteIngredients.isEmpty()) {
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
        } else {
            // userProposedDishes = new ArrayList<>();
            return recipes;
        }
        if (userProposedDishes.isEmpty()) {
            throw new Error("Your proposed dishes list is empty");
        }

        // System.out.println("userProposedDishes: " + userProposedDishes);
        return userProposedDishes;
    }

    public List<Recipe> getRecipesByUserDislikedIngredients(String userID) {
        User user = userRepository.findUserById(userID);

        List<String> userDislikedIngredients = user.getDislikedIngredients();
        List<Recipe> recipes = recipeRepository.findAll();
        List<Recipe> userDislikedDishes = new ArrayList<Recipe>();

        if (!userDislikedIngredients.isEmpty()) {
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
        } else if (userDislikedIngredients.isEmpty()) {
            // System.out.println(" TEST NA BRAK NIELUBIANYCH SKŁADNIKÓW! ");
            userDislikedDishes = new ArrayList<>();

        }

        // System.out.println("userDislikedDishes: " + userDislikedDishes);
        return userDislikedDishes;
    }

    public List<Recipe> getRecipesByUserPreferences(String userID) {

        List<Recipe> userFavoriteDishes = new ArrayList<>();
        List<Recipe> userDislikedDishes = new ArrayList<>();
        List<Recipe> userDishesByUserPreferences = new ArrayList<>();
        List<Recipe> dishesWithoutGluten = recipeRepository.findByDishType("gluten-free");
        List<Recipe> dishesWithoutLactose = recipeRepository.findByDishType("lactose-free");
        List<Recipe> dishesWithoutMeat = recipeRepository.findByDishType("vegan");
        List<Recipe> standardDishes = recipeRepository.findByDishType("standard");
        List<Recipe> recipes = recipeRepository.findAll();
        User user = userRepository.findUserById(userID);

        try {
            userFavoriteDishes = this.getRecipesByUserFavouriteIngredients(userID);
        } catch (Exception exception) {
            throw new Error("userFavouriteIngredients is empty!");
        }

        // System.out.println("userDislikedDishes: " + userDislikedDishes);

        try {
            userDislikedDishes = this.getRecipesByUserDislikedIngredients(userID);
            // System.out.println("userDislikedDishes: " + userDislikedDishes);
        } catch (Exception exception) {
            throw new Error("userDislikedIngredients is empty!");
        }

        // if (userDislikedDishes.isEmpty()
        // && userFavoriteDishes.isEmpty()
        // && !user.isDishesWithGluten()
        // && !user.isDishesWithLactose()
        // && !user.isDishesWithMeat()) {
        // userDishesByUserPreferences = recipes;
        // }

        if (!userDislikedDishes.isEmpty()) {
            userFavoriteDishes.removeAll(userDislikedDishes);
            userDishesByUserPreferences = userFavoriteDishes;
            // } else if (userDislikedDishes.isEmpty()
            // && userFavoriteDishes.isEmpty()
            // && user.isDishesWithGluten()
            // && user.isDishesWithLactose()
            // && user.isDishesWithMeat()) {
            // userDishesByUserPreferences = recipes;
        } else {
            userDislikedDishes = new ArrayList<>();
            userDishesByUserPreferences = userFavoriteDishes;
            // throw new Error("userDislikedDishes is empty!");
        }

        // if (user.isDishesWithGluten()
        // && user.isDishesWithLactose()
        // && user.isDishesWithMeat()) {
        // return userDishesByUserPreferences;

        if (user.getDietOption().equals("glutenFreeOption")) {
            List<Recipe> glutenDishes = userDishesByUserPreferences.stream()
                    .filter(dish -> dish.getDishType().equals("gluten-free"))
                    .collect(Collectors.toList());

            return glutenDishes;
        }
        if (user.getDietOption().equals("lactoseFreeOption")) {
            List<Recipe> lactoseDishes = userDishesByUserPreferences.stream()
                    .filter(dish -> dish.getDishType().equals("lactose-free"))
                    .collect(Collectors.toList());

            return lactoseDishes;
        }
        if (user.getDietOption().equals("vegetarianOption")) {
            List<Recipe> vegetarianDishes = userDishesByUserPreferences.stream()
                    .filter(dish -> dish.getDishType().equals("vegan"))
                    .collect(Collectors.toList());

            return vegetarianDishes;
        }
        if (user.getDietOption().equals("standardOption")) {
            List<Recipe> meatDishes = userDishesByUserPreferences.stream()
                    .filter(dish -> dish.getDishType().equals("standard"))
                    .collect(Collectors.toList());

            return meatDishes;
        }

        // if (user.isDishesWithGluten()) {
        // return glutenDishes;
        // }
        // System.out.println("userFavoriteDishes: " + userFavoriteDishes);

        // System.out.println("userDishesByUserPreferences: " +
        // userDishesByUserPreferences);
        // return userDishesByUserPreferences;

        return userDishesByUserPreferences;
    }
}
