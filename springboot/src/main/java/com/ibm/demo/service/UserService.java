package com.ibm.demo.service;

import com.ibm.demo.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAllUsers();

    User findByUsername(String username);

    void updateUser(User user);

    UserDetails loadUserByUsername(String username);

    User saveUser(User user);
}
