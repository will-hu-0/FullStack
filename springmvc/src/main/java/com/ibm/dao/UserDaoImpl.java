package com.ibm.dao;

import com.ibm.domain.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

/**
 * @author will
 */
@Repository
public class UserDaoImpl implements UserDao {
    final static Logger logger = LoggerFactory.getLogger(UserDao.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<User> findAllUsers() {
        List<User> result = jdbcTemplate.query("select * from tbl_user", new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                return getUser(rs);
            }
        });

        return result;
    }

    @Override
    public User findByUsername(String username) {
        String sql = "select * from tbl_user where username=?";

        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", username);
        }

        User result = jdbcTemplate.query(sql, new ResultSetExtractor<User>() {
            @Override
            public User extractData(ResultSet rs) throws SQLException {
                if (rs.next()) {
                    return getUser(rs);
                }

                return null;
            }
        }, username);

        return result;
    }

    private User getUser(ResultSet rs) throws SQLException {
        User o = new User();
        o.setUserId(rs.getInt("user_id"));
        o.setName(rs.getString("name"));
        o.setEmail(rs.getString("email"));
        o.setUsername(rs.getString("username"));
        o.setPassword(rs.getString("password"));
        o.setAdmin(rs.getBoolean("admin"));
        return o;
    }

    @Override
    public User createUser(final User user) {
        final String sql = "insert into tb_user(name,email,username,password,admin) values (?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", user);
        }

        jdbcTemplate.update(new PreparedStatementCreator() {

            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setString(1, user.getName());
                ps.setString(2, user.getEmail());
                ps.setString(3, user.getUsername());
                ps.setString(4, user.getPassword());
                ps.setBoolean(5, user.isAdmin());
                return ps;
            }
        }, keyHolder);

        if (logger.isDebugEnabled()) {
            logger.debug("keyholder: {}", keyHolder.getKeys());
        }

        return user;
    }

    @Override
    public void updateUser(User user) {
        String sql = "update tbl_user set name=?,email=?,username=?,password=?,admin=? where user_id=?";

        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", user);
        }

        List<Object> params = new ArrayList<>();
        params.add(user.getName());
        params.add(user.getEmail());
        params.add(user.getUsername());
        params.add(user.getPassword());
        params.add(user.getUserId());
        params.add(user.isAdmin());

        jdbcTemplate.update(sql, params.toArray());
    }

}
