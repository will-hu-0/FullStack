package com.ibm.controller;

import com.ibm.domain.Constant;
import com.ibm.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;


@Controller
public class HomeController {

    final static Logger logger = LoggerFactory.getLogger(HomeController.class);

    @RequestMapping("/")
    public String defaultPage(ModelMap model) {
        model.addAttribute("message", "!!");
        return "login";
    }

    @RequestMapping("/home")
    public String home(ModelMap model, HttpSession session) {
        Object loginOrNot = session.getAttribute(Constant.IS_LOGIN);
        if (loginOrNot != null && (Boolean)loginOrNot) {
            User sessionUser = (User)session.getAttribute(Constant.USER);
            model.addAttribute("isAdmin", sessionUser.isAdmin());
            model.addAttribute("username", sessionUser.getUsername());
            model.addAttribute("email", sessionUser.getEmail());
            return "home";
        } else {
            return "login";
        }
    }
}
