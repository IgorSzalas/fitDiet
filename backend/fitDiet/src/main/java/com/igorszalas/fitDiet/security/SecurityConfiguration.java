package com.igorszalas.fitDiet.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.igorszalas.fitDiet.services.UserServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private JWTAuthorizationEntryPoint jwtAuthorizationEntryPoint;

    private UserServiceImpl userServiceImpl;

    public SecurityConfiguration(JWTAuthorizationEntryPoint jwtAuthorizationEntryPoint,
            UserServiceImpl userServiceImpl) {
        this.jwtAuthorizationEntryPoint = jwtAuthorizationEntryPoint;
        this.userServiceImpl = userServiceImpl;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWTAuthorizationFilter jwtAuthenticationFilter() {
        return new JWTAuthorizationFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        // httpSecurity
        // .csrf().disable()
        // .exceptionHandling()
        // .authenticationEntryPoint(jwtAuthorizationEntryPoint)
        // .and()
        // .sessionManagement()
        // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        // .and()
        // // .authorizeHttpRequests()
        // .authorizeRequests()
        // // .requestMatchers(HttpMethod.GET).permitAll()
        // .requestMatchers("/login").permitAll()
        // .anyRequest().authenticated()
        // .and()
        // .httpBasic();

        httpSecurity.authorizeHttpRequests(
                (authorize) -> authorize.requestMatchers("/login").permitAll().anyRequest().authenticated())
                .csrf((csrf) -> csrf.disable())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exception)->exception.authenticationEntryPoint(jwtAuthorizationEntryPoint));

        httpSecurity.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    // @Bean
    // public UserDetailsService defaultUsers() {
    // UserDetails administrator = User.builder()
    // .username("admin")
    // .password("admin")
    // .roles("ADMIN")
    // .build();

    // UserDetails standardUser = User.builder()
    // .username("user")
    // .password("password")
    // .roles("USER")
    // .build();

    // return new InMemoryUserDetailsManager(administrator, standardUser);
    // }
}