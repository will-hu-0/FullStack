package com.ibm.service;

import com.ibm.dao.UserDao;
import com.ibm.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author will
 */
@Service
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    public List<User> findAllUsers() {
        return userDao.findAllUsers();
    }

    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    public User createUser(User user) {
        return userDao.createUser(user);
    }

    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User does not exist.");
        }

        GrantedAuthority roleUser = new SimpleGrantedAuthority("ROLE_USER");

        Collection<GrantedAuthority> grantedAuths = new ArrayList<>();
        grantedAuths.add(roleUser);

        if (user.isAdmin()) {
            GrantedAuthority roleAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
            grantedAuths.add(roleAdmin);
        }

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), grantedAuths);
    }

}