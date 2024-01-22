package com.igorszalas.fitDiet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.igorszalas.fitDiet.controllers.UserController;
import com.igorszalas.fitDiet.models.DietProgres;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.repositories.UserRepository;

@SpringBootTest
class UserControllerTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Test
    void testGetUser() {
        String userID = "658ecacd593ff315ab3c4e4c";

        User user = new User();

        when(userRepository.findUserById(userID)).thenReturn(user);

        ResponseEntity<User> response = userController.getUser(userID);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());

        verify(userRepository, times(1)).findUserById(userID);
    }

    @Test
    void testGetFavouriteIngredientsByUsers() {
        String userID = "658ecacd593ff315ab3c4e4c";

        User user = new User();

        List<String> userFavoriteIngredients = Arrays.asList("migdały ");

        user.setFavouriteIngredients(userFavoriteIngredients);

        when(userRepository.findUserById(userID)).thenReturn(user);

        ResponseEntity<List<String>> response = userController.getFavouriteIngredientsByUsers(userID);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userFavoriteIngredients, response.getBody());

        verify(userRepository, times(1)).findUserById(userID);
    }

    @Test
    void testGetDietProgresByUser() {
        String userID = "658ecacd593ff315ab3c4e4c";

        User user = new User();

        DietProgres dietProgres = new DietProgres();
        dietProgres.setWeight(80);
        dietProgres.setBmi(24);
        dietProgres.setDate("10.11.2023");

        List<DietProgres> userDietProgres = Arrays.asList(dietProgres);

        user.setDietProgres(userDietProgres);

        when(userRepository.findUserById(userID)).thenReturn(user);

        ResponseEntity<List<DietProgres>> response = userController.getDietProgresByUser(userID);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDietProgres, response.getBody());

        verify(userRepository, times(1)).findUserById(userID);
    }
}
