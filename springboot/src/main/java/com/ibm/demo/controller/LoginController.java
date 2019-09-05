package com.ibm.demo.controller;

import com.ibm.demo.domain.User;
import com.ibm.demo.exception.UserExistException;
import com.ibm.demo.exception.UserNotExistException;
import com.ibm.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
public class LoginController extends BaseController {
    final static Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;

    @GetMapping(value = "/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "logout", required = false) String logout, HttpSession session, Model model) {

        AuthenticationException ex = (AuthenticationException) session
                .getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);

        String errorMessage = (error != null && ex != null) ? ex.getMessage() : null;

        if (logout != null) {
            errorMessage = "You have been successfully logged out !!";
        }

        model.addAttribute("errorMessage", errorMessage);
        logger.debug("error message is {}", errorMessage);
        return "login";
    }

    @PostMapping("/login")
    public ResponseEntity doLogin(@RequestParam(name = "kaptcha") String kaptcha,
                                  User user, HttpSession session) {
        try {
            validateCaptcha(kaptcha, session);

            User existingUser = userService.findByUsername(user.getUsername());
            if (existingUser == null) {
                throw new UserNotExistException(user.getUsername());
            } else {
                return new ResponseEntity(existingUser, HttpStatus.OK);
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseEntity(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/logout")
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout=true";
    }

    @GetMapping("/register")
    public String register(@RequestParam(value = "error", required = false) String error, Model model) {
        model.addAttribute("errorMessage", error);
        logger.debug("error message is {}", error);
        return "register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST,
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public String doRegister(@RequestParam(name = "kaptcha", required = true) String kaptcha,
                                     User user, HttpSession session) {
        try {
            validateCaptcha(kaptcha, session);

            User existingUser = userService.findByUsername(user.getUsername());
            if (existingUser != null) {
                throw new UserExistException(user.getUsername());
            }
            userService.saveUser(user);
            return "login";
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return "register?error=" + ex.getMessage();
        }
    }
}
