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
import com.igorszalas.fitDiet.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@CrossOrigin
@RestController

@RequestMapping("/dishes")
public class DishController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DishRepository dishRepository;

    public User updateDishByDishID(String userID, String dishID, Dish dishData) {
        try {
            User user = userRepository.findUserById(userID);
            List<Dish> userDishes = user.getPlannedDishes();

            Dish dishByDishID = new Dish();
            for (int i = 0; i < userDishes.size(); i++) {
                Dish dish = userDishes.get(i);
                System.out.println("    dish.getDishID()    " + dish.getDishID() + "   ");
                if (dish.getDishID().equals(dishID)) {

                    dishByDishID = dish;
                    System.out.println("OK");
                    Dish newDish = new Dish();
                    newDish.setDishID(dishID);
                    newDish.setDishTitle(dishData.getDishTitle());
                    newDish.setDishRecipe(dishData.getDishRecipe());
                    newDish.setDateOfConsumption(dishData.getDateOfConsumption());
                    userDishes.set(i, newDish);
                    System.out.println("    newDish    " + newDish + "        ");
                } else {
                    System.out.println("Dish with this dishID doesnt exists!");
                }
            }
            user.setPlannedDishes(userDishes);
            // System.out.println("    userDishes    " + userDishes + "        ");
            return user;
        } catch (Exception exception) {
            throw new Error(exception);
        }
    }

    public User deleteDishByDishID(String userID, String dishID) {
        try {
            User user = userRepository.findUserById(userID);
            List<Dish> userDishes = user.getPlannedDishes();

            Dish dishByDishID = new Dish();
            for (int i = 0; i < userDishes.size(); i++) {
                Dish dish = userDishes.get(i);
                System.out.println("    dish.getDishID()    " + dish.getDishID() + "   ");
                if (dish.getDishID().equals(dishID)) {
                    userDishes.remove(dish);
                    dishByDishID = dish;
                    System.out.println("OK");
                } else {
                    System.out.println("Dish with this dishID doesnt exists!");
                }
            }
            user.setPlannedDishes(userDishes);
            // System.out.println("    userDishes    " + userDishes + "        ");
            return user;
        } catch (Exception exception) {
            throw new Error(exception);
        }
    }

    @PutMapping("/modify-dish")
    public ResponseEntity<User> editDishByDishID(@RequestParam String userID,
            @RequestBody Dish dishData, @RequestParam String dishID) {
        try {
            User user = this.updateDishByDishID(userID, dishID, dishData);
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-dish")
    public ResponseEntity<User> deleteDish(@RequestParam String userID, @RequestParam String dishID) {
        try {
            User user = this.deleteDishByDishID(userID, dishID);
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
