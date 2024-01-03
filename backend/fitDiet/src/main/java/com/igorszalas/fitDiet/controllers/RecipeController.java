package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.Recipe;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.RecipeRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.RecipeServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    RecipeServiceImpl recipeService;

    @GetMapping()
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @GetMapping("/favourite-ingredients")
    public List<Recipe> getRecipesByUserFavouriteIngredients(@RequestParam String userID) {
        return recipeService.getRecipesByUserFavouriteIngredients(userID);
    }

}
