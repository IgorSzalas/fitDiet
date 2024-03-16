package com.igorszalas.fitDiet.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igorszalas.fitDiet.models.Dish;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.DishRepository;
import com.igorszalas.fitDiet.repositories.UserRepository;

@Service
public class DishServiceImpl {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public User updateDishByDishID(String userID, String dishID, Dish dishData) {
        try {
            User user = userRepository.findUserById(userID);
            List<Dish> userDishes = user.getPlannedDishes();

            Dish dishByDishID = new Dish();
            for (int i = 0; i < userDishes.size(); i++) {
                Dish dish = userDishes.get(i);
                if (dish.getDishID().equals(dishID)) {
                    dishByDishID = dish;
                    Dish newDish = new Dish();
                    newDish.setDishID(dishID);
                    newDish.setDishTitle(dishData.getDishTitle());
                    newDish.setDishRecipe(dishData.getDishRecipe());
                    newDish.setDateOfConsumption(dishData.getDateOfConsumption());
                    userDishes.set(i, newDish);
                } else {
                    System.out.println("Dish with this dishID doesnt exists!");
                }
            }
            user.setPlannedDishes(userDishes);
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
                } else {
                    System.out.println("Dish with this dishID doesnt exists!");
                }
            }
            user.setPlannedDishes(userDishes);
            return user;
        } catch (Exception exception) {
            throw new Error(exception);
        }
    }
}
