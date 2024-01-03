package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/igredients")
    public List<String> getFavouriteIngredientsByUsers(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        return user.getFavouriteIngredients();
    }

    // @PutMapping("path/{id}")
    // public User editFavouriteIngredients(@PathVariable String userID, @RequestBody SomeEnityData entity) {
    //     //TODO: process PUT request
        
    //     return entity;
    // }
}
