package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public UserEntity add(@RequestBody UserEntity user) {
        return userService.saveUser(user);
    }

}
