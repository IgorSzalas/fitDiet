package com.igorszalas.fitDiet.dto;

import java.util.List;

import com.igorszalas.fitDiet.models.Post;
import com.igorszalas.fitDiet.models.DietProgres;
import com.igorszalas.fitDiet.models.Dish;

import lombok.Data;

@Data
public class RegisterDTO {
    private String firstName;
    private String surname;
    private String email;
    private String password;
    private String profilePhoto;
    private double userWeight;
    private int userHeight;
    private List<String> favouriteRecipes;
    private List<String> favouriteIngredients;
    private List<String> dislikedIngredients;
    private List<String> ingredients;
    private List<Post> userPost;
    private List<DietProgres> dietProgres;
    private String dietOption;
    private double userActivityMode;
    private String dateOfBirth;
    private String userGender;
    private int caloricDemand;
    private List<Dish> plannedDishes;

}
