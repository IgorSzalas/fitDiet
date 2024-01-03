package com.igorszalas.fitDiet.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.igorszalas.fitDiet.models.Post;


public interface PostRepository extends MongoRepository<Post, String>{
    
    List<Post> getPostByTitle();

    List<Post> getPostByRating();
}
