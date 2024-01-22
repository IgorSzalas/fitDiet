package com.igorszalas.fitDiet.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;

    @DocumentReference
    private Dish dish;

    private String name;

    private String dishType;

    private String description;

    private String rating;

    private List<String> ingredients;

    private List<Nutrient> nutrients;

    private String photo;

    private int caloricValue;

    private String creator;
}
