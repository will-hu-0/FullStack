package com.ibm.demo.dao;

import com.ibm.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, String> {
    public User findByUsername(String username);
}
