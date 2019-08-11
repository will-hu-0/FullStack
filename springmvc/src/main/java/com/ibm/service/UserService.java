package com.ibm.service;

import com.ibm.domain.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();

    User findByUsername(String username);

    User createUser(User user);

    void updateUser(User user);

    UserDetails loadUserByUsername(String username);
}
