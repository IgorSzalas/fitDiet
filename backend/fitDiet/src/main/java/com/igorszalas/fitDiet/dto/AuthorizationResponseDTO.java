package com.igorszalas.fitDiet.dto;

import lombok.Data;

@Data
public class AuthorizationResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";

    public AuthorizationResponseDTO(String accessToken){
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }
}
