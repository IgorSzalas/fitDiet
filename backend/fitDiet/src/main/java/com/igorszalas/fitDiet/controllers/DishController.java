package com.igorszalas.fitDiet.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.Dish;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.DishRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.DishServiceImpl;
import com.igorszalas.fitDiet.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/dishes")
public class DishController {
    @Autowired
    DishServiceImpl dishService;
    @Autowired
    private UserRepository userRepository;

    @PutMapping("/modify-dish")
    public ResponseEntity<User> editDishByDishID(@RequestParam String userID,
            @RequestBody Dish dishData, @RequestParam String dishID) {
        try {
            User user = dishService.updateDishByDishID(userID, dishID, dishData);
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-dish")
    public ResponseEntity<User> deleteDish(@RequestParam String userID, @RequestParam String dishID) {
        try {
            User user = dishService.deleteDishByDishID(userID, dishID);
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
