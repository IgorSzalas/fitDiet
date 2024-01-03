package com.igorszalas.fitDiet.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    private String firstName;

    private String surname;

    private String email;

    private String password;

    private List<UserType> userType = new ArrayList<>();

    private String profilePhoto;

    private List<String> favouriteRecipes;

    private List<String> favouriteIngredients;

    private List<String> dietProgres;

    private List<Post> userPosts;

    @Override
    public String getPassword() {
        return password;
    }

    
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    public void setUserType(List<UserType> singletonList) {
        this.userType = userType;
    }

}