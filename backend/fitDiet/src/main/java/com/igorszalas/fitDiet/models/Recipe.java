package com.igorszalas.fitDiet.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

    private String name;

    private String description;

    private String rating;

    private List<String> ingredients;

    private List<String> nutrients;

    private String photo;

    private int caloricValue;

    private String creator;
}
