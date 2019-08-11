package com.ibm.dao;

import com.ibm.domain.User;

import java.util.List;

/**
 * @author will
 */
public interface UserDao {

    List<User> findAllUsers();

    User findByUsername(String username);

    User createUser(final User user);

    void updateUser(User user);
}
