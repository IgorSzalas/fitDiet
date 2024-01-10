package com.igorszalas.fitDiet.services;

import java.util.List;

import com.igorszalas.fitDiet.models.User;

public interface UserService {

    List<User> getAllUsers();

    List<User> getAllSortedUsers();

    List<User> getUsertByEmail(String email);

}
