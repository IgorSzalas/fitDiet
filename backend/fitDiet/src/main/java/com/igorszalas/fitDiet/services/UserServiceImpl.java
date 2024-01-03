package com.igorszalas.fitDiet.services;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.igorszalas.fitDiet.models.User;
import com.igorszalas.fitDiet.models.UserType;
import com.igorszalas.fitDiet.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

  private UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public List<User> getAllSortedUsers() {
    return userRepository.findAll();
  }

  @Override
  public List<User> getUsertByEmail(String email) {
    throw new UnsupportedOperationException("Unimplemented method 'getUsertByEmail'");
  }

  @Override
  public List<User> getUserById() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUserById'");
  }

  @Override
  public List<User> getUserByRole() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUserByRole'");
  }

  @Override
  public List<User> getUserByPosts() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUserByPosts'");
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    System.out.println("TESTOWE EMAIL: " + email);
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Not found user with this email"));
    return user.builder()
        .email(user.getEmail())
        .password(user.getPassword())
        .build();
  }

  private Collection<GrantedAuthority> mapUserTypesToAuthorities(List<UserType> userTypes) {
    return userTypes.stream().map(userType -> new SimpleGrantedAuthority(userType.getUserTypeName()))
        .collect(Collectors.toList());
  }
}
