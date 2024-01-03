package com.igorszalas.fitDiet.dto;

import java.util.List;

import lombok.Data;

@Data
public class RegisterDTO {
    private String firstName;
    private String surname;
    private String email;
    private String password;
    private String profilePhoto;
    private List<String> favouriteRecipes;
    private List<String> favouriteIngredients;
}
