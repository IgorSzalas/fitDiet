package com.igorszalas.fitDiet.models;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Comment {
    @Id
    String commentID;
    String creatorID;
    String creatorUsername;
    String commentContent;
    String creationDate;
}
