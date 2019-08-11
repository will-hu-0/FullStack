package com.ibm.service;

import com.ibm.dao.UserDao;
import com.ibm.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> findAllUsers() {
        return userDao.findAllUsers();
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public User createUser(User user) {
        return userDao.createUser(user);
    }

    @Override
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

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(
                new UsernamePasswordAuthenticationToken(username, user.getPassword(), grantedAuths));
        SecurityContextHolder.setContext(securityContext);

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), grantedAuths);
    }

}