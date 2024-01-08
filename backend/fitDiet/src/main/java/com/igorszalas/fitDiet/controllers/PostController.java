package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.Post;
import com.igorszalas.fitDiet.repositories.PostRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;

    @GetMapping("/all-posts")
    public List<Post> getAllPosts(@RequestParam String param) {
        return postRepository.findAll();
    }

    // @PostMapping("path")
    // public Post addNewPost(@RequestBody SomeEnityData entity) {
    // //TODO: process POST request

    // return entity;
    // }

    // @PutMapping("post/{id}")
    // public SomeEnityData editPost(@PathVariable String id, @RequestBody
    // SomeEnityData entity) {
    // return entity;
    // }

    // @DeleteMapping("delete")
    // public deletePost(){}

}
