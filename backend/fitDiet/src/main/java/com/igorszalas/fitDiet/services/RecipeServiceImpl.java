package com.igorszalas.fitDiet.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igorszalas.fitDiet.models.Recipe;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.RecipeRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;

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
}
