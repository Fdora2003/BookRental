package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import Webfejlesztes_Projekt.BookRental.Service.AuthenticationService;
import Webfejlesztes_Projekt.BookRental.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping()
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;


    public UserEntity save(@RequestBody UserEntity entity){
        return userService.saveUser(entity);
    }
    //entity rendelkezik ID-val, akkor update, amúgy save


    @GetMapping("/getAll")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUser();
    }

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity user){
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        return authenticationService.register(user);
    }


}
