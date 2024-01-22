package com.igorszalas.fitDiet.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Nutrient {
    String title;
    int value;
}
