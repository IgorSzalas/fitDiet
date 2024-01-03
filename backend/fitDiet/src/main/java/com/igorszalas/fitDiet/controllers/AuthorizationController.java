package com.igorszalas.fitDiet.controllers;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.igorszalas.fitDiet.dto.AuthorizationResponseDTO;
import com.igorszalas.fitDiet.dto.LoginDTO;
import com.igorszalas.fitDiet.dto.RegisterDTO;
import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.models.UserType;
import com.igorszalas.fitDiet.models.UserTypeEnum;
import com.igorszalas.fitDiet.repositories.UserRepository;
import com.igorszalas.fitDiet.repositories.UserTypeRepository;
import com.igorszalas.fitDiet.security.JWTGenerator;
import com.igorszalas.fitDiet.services.UserService;

@RestController
@CrossOrigin
public class AuthorizationController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserTypeRepository userTypeRepository;
    private JWTGenerator jwtGenerator;

    public AuthorizationController(UserService userService, AuthenticationManager authenticationManager,
            UserRepository userRepository, PasswordEncoder passwordEncoder, UserTypeRepository userTypeRepository,
            JWTGenerator jwtGenerator) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userTypeRepository = userTypeRepository;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            return new ResponseEntity<>("This email is occupied!", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setFirstName(registerDTO.getFirstName());
        user.setSurname(registerDTO.getSurname());
        user.setProfilePhoto(registerDTO.getProfilePhoto());
        user.setFavouriteRecipes(registerDTO.getFavouriteRecipes());
        user.setFavouriteIngredients(registerDTO.getFavouriteIngredients());

        UserType userType = userTypeRepository.findByUserTypeName(UserTypeEnum.USER).get();
        user.setUserType(Collections.singletonList(userType));

        userRepository.save(user);
        return new ResponseEntity<>("Registration has been completed!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthorizationResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateJWTToken(authentication);
        return new ResponseEntity<>(new AuthorizationResponseDTO(token), HttpStatus.OK);

    }
}
