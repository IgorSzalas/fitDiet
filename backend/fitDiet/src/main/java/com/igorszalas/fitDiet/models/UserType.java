package com.igorszalas.fitDiet.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "usertype")
public class UserType {
    @Id
    private String id;

    private String userTypeName;

    public UserType(String userTypeName) {
        this.userTypeName = userTypeName;
    }
}
