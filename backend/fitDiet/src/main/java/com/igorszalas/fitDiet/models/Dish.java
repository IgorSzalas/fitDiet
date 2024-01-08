package com.igorszalas.fitDiet.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "dishes")
public class Dish {
    @Id
    private String dishID;

    private String dishTitle;

    private String dateOfConsumption;
    
    private Recipe dishRecipe;
}
