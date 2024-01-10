package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.Recipe;
import com.igorszalas.fitDiet.repositories.RecipeRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.RecipeServiceImpl;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
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

    @GetMapping("/all-ingredients")
    public ResponseEntity<Set<String>> getAllIngredients() {
        try {
            List<Recipe> recipes = recipeRepository.findAll();
            Set<String> ingredents = new TreeSet<>();
            for (Recipe recipe : recipes) {
                List<String> recipeIngredients = recipe.getIngredients();
                for (String ingredient : recipeIngredients) {
                    ingredents.add(ingredient);
                }
            }
            return new ResponseEntity<>(ingredents, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/favourite-ingredients")
    public ResponseEntity<List<Recipe>> getRecipesByUserFavouriteIngredients(@RequestParam String userID) {
        try {
            return new ResponseEntity<>(recipeService.getRecipesByUserFavouriteIngredients(userID), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user-preferences")
    public ResponseEntity<List<Recipe>> getRecipesByUserPreferences(@RequestParam String userID) {
        try {
            return new ResponseEntity<>(recipeService.getRecipesByUserPreferences(userID), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
