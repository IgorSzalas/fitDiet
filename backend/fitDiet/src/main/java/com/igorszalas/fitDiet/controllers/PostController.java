package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.Post;
import com.igorszalas.fitDiet.repositories.PostRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;

    @GetMapping("/all-posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        try {
            return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deletePost(@RequestParam String postID) {
        try {
            postRepository.deleteById(postID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add-post")
    public ResponseEntity<Post> addNewPost(@RequestBody Post postData) {
        try {
            return new ResponseEntity<>(postRepository.save(postData), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
