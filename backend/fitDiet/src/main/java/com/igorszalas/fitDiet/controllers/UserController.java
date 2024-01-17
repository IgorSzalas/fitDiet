package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.DietProgres;
import com.igorszalas.fitDiet.models.Dish;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.models.WaterMeasurment;
import com.igorszalas.fitDiet.repositories.DishRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/users")
@AllArgsConstructor
@NoArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DishRepository dishRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String userID) {
        try {
            User user = userRepository.findUserById(userID);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        userRepository.delete(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/igredients")
    public ResponseEntity<List<String>> getFavouriteIngredientsByUsers(@RequestParam String userID) {
        try {
            User user = userRepository.findUserById(userID);
            return new ResponseEntity<>(user.getFavouriteIngredients(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user-progres")
    public ResponseEntity<List<DietProgres>> getDietProgresByUser(@RequestParam String userID) {
        try {
            User user = userRepository.findUserById(userID);
            return new ResponseEntity<>(user.getDietProgres(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user-water-progres")
    public ResponseEntity<List<WaterMeasurment>> getWaterProgresByUser(@RequestParam String userID) {
        try {
            User user = userRepository.findUserById(userID);
            return new ResponseEntity<>(user.getUserWaterMeasurment(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user-dishes")
    public ResponseEntity<List<Dish>> getPlannedDishesByUser(@RequestParam String userID) {
        try {
            User user = userRepository.findUserById(userID);
            return new ResponseEntity<>(user.getPlannedDishes(), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/igredients/edit")
    public ResponseEntity<User> editIngredients(@RequestParam String userID,
            @RequestBody User user) {
        try {
            User userData = userRepository.findUserById(userID);
            if (!userData.equals(null)) {
                User editUserIngredients = userData;
                editUserIngredients.setId(user.getId());
                editUserIngredients.setFavouriteIngredients(user.getFavouriteIngredients());
                editUserIngredients.setDislikedIngredients(user.getDislikedIngredients());
                editUserIngredients.setDietOption(user.getDietOption());
                // System.out.println(" EDIT USER INGREDIENTS " + editUserIngredients);
                return new ResponseEntity<>(userRepository.save(editUserIngredients), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(userData, HttpStatus.OK);
            }
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/add-new-water-measurment")
    public ResponseEntity<?> addNewWaterMeasurmentToUser(@RequestParam String userID,
            @RequestBody WaterMeasurment newWaterMeasurment) {
        User user = userRepository.findUserById(userID);
        List<WaterMeasurment> userWaterMeasurment = user.getUserWaterMeasurment();
        if (userWaterMeasurment == null) {
            userWaterMeasurment = new ArrayList<>();
            userWaterMeasurment.add(newWaterMeasurment);
        } else {
            userWaterMeasurment.add(newWaterMeasurment);
        }
        user.setUserWaterMeasurment(userWaterMeasurment);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/user/add-new-diet-measurment")
    public ResponseEntity<?> addNewDietMeasurmentToUser(@RequestParam String userID,
            @RequestBody DietProgres newDietMeasurment) {
        User user = userRepository.findUserById(userID);
        user.setUserWeight(newDietMeasurment.getWeight());

        List<DietProgres> userDietMeasurment = user.getDietProgres();
        if (userDietMeasurment == null) {
            userDietMeasurment = new ArrayList<>();
            userDietMeasurment.add(newDietMeasurment);
        } else {
            userDietMeasurment.add(newDietMeasurment);
        }
        user.setDietProgres(userDietMeasurment);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/user/add-new-dish")
    public ResponseEntity<?> addNewDishToUser(@RequestParam String userID, @RequestBody Dish newDish) {
        User user = userRepository.findUserById(userID);
        List<Dish> userPlannedDishes = user.getPlannedDishes();
        Dish dish = dishRepository.save(newDish);
        userPlannedDishes.add(dish);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<User> editUser(@RequestParam String userID,
            @RequestBody User user) {
        System.out.println("        USER ID TEST        " + userID);
        User userData = userRepository.findUserById(userID);
        if (!userData.equals(null)) {
            User editUserIngredients = userData;
            editUserIngredients.setFirstName(user.getFirstName());
            editUserIngredients.setSurname(user.getSurname());
            editUserIngredients.setEmail(user.getEmail());
            // editUserIngredients.setUserType(user.getUserType());
            // editUserIngredients.setPassword(user.getPassword());

            return new ResponseEntity<>(userRepository.save(editUserIngredients), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userData, HttpStatus.OK);
        }
    }

    @PutMapping("/edit-dish")
    public ResponseEntity<User> addDishToUser(@RequestParam String userID,
            @RequestBody User user) {
        try {
            User userData = userRepository.findUserById(userID);
            if (!userData.equals(null)) {
                User editUserIngredients = userData;
                editUserIngredients.setId(user.getId());
                editUserIngredients.setPlannedDishes(user.getPlannedDishes());
                return new ResponseEntity<>(userRepository.save(editUserIngredients), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(userData, HttpStatus.OK);
            }
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
