package com.igorszalas.fitDiet.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.models.DietProgres;
import com.igorszalas.fitDiet.models.Dish;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.DishRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    @Autowired
    private MongoTemplate mongoTemplate;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user")
    public User getUser(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        return user;
    }

    @DeleteMapping("/user")
    public void deleteUser(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        userRepository.delete(user);
    }

    @GetMapping("/igredients")
    public List<String> getFavouriteIngredientsByUsers(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        return user.getFavouriteIngredients();
    }

    @GetMapping("/user-progres")
    public List<DietProgres> getDietProgresByUser(@RequestParam String userID) {
        User user = userRepository.findUserById(userID);
        return user.getDietProgres();
    }

    @PutMapping("/igredients/edit")
    public User editIngredients(@RequestParam String userID,
            @RequestBody User user) {
        User userData = userRepository.findUserById(userID);
        if (!userData.equals(null)) {
            User editUserIngredients = userData;
            editUserIngredients.setId(user.getId());
            editUserIngredients.setFavouriteIngredients(user.getFavouriteIngredients());
            editUserIngredients.setDislikedIngredients(user.getDislikedIngredients());
            return userRepository.save(editUserIngredients);
        } else {
            return userData;
        }
    }

    @PutMapping("/user/add-new-dish")
    public void addNewDishToUser(@RequestParam String userID, @RequestBody Dish newDish) {
        User user = userRepository.findUserById(userID);
        List<Dish> userPlannedDishes = user.getPlannedDishes();
        Dish dish = dishRepository.save(newDish);
        userPlannedDishes.add(dish);
        System.out.println("                               USER:                             " + user
                + "                                                             ");
        userRepository.save(user);
    }

    @PutMapping("/edit")
    public User editUser(@RequestParam String userID,
            @RequestBody User user) {
        System.out.println("        USER ID TEST        " + userID);
        User userData = userRepository.findUserById(userID);
        if (!userData.equals(null)) {
            User editUserIngredients = userData;
            editUserIngredients.setFirstName(user.getFirstName());
            editUserIngredients.setSurname(user.getSurname());
            editUserIngredients.setEmail(user.getEmail());
            //editUserIngredients.setUserType(user.getUserType());
            // editUserIngredients.setPassword(user.getPassword());

            return userRepository.save(editUserIngredients);
        } else {
            return userData;
        }
    }

    @PutMapping("/edit-dish")
    public User addDishToUser(@RequestParam String userID,
            @RequestBody User user) {
        User userData = userRepository.findUserById(userID);
        if (!userData.equals(null)) {
            User editUserIngredients = userData;
            editUserIngredients.setId(user.getId());
            editUserIngredients.setPlannedDishes(user.getPlannedDishes());
            return userRepository.save(editUserIngredients);
        } else {
            return userData;
        }
    }
}
