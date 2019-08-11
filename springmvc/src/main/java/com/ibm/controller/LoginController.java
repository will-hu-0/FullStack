package com.ibm.controller;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.ibm.domain.Constant;
import com.ibm.domain.User;
import com.ibm.exception.UserExistException;
import com.ibm.exception.UserNotExistException;
import com.ibm.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController extends BaseController {
    final static Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity doRegister(@RequestParam(name = "kaptcha", required=true) String kaptcha,
                                     @Valid @RequestBody User user, HttpSession session) {
        try {
            validateCaptcha(kaptcha, session);

            User existingUser = userService.findByUsername(user.getUsername());
            if (existingUser != null) {
                throw new UserExistException(user.getUsername());
            }

            userService.createUser(user);
            return new ResponseEntity(user, HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseEntity(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/register")
    public String register() {
        return "registration";
    }

    @GetMapping(value = "/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity doLogin(@RequestParam(name = "kaptcha") String kaptcha,
                                     @RequestBody User user, HttpSession session) {
        try {
            validateCaptcha(kaptcha, session);

            User existingUser = userService.findByUsername(user.getUsername());
            if (existingUser == null) {
                throw new UserNotExistException(user.getUsername());
            } else {
                // save login status to session
                session.setAttribute(Constant.IS_LOGIN, true);
                session.setAttribute(Constant.USER, existingUser);
                return new ResponseEntity(existingUser, HttpStatus.OK);
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseEntity(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/logout")
    public String logoutPage(HttpSession session) {
        session.setAttribute(Constant.IS_LOGIN, false);
        session.setAttribute(Constant.USER, null);
        return "redirect:/login";
    }
}
