package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import Webfejlesztes_Projekt.BookRental.Service.AuthenticationService;
import Webfejlesztes_Projekt.BookRental.Service.JwtService;
import Webfejlesztes_Projekt.BookRental.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder;


    public UserEntity save(@RequestBody UserEntity entity){
        return userService.saveUser(entity);
    }
    //entity rendelkezik ID-val, akkor update, amúgy save


    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity user){
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        return authenticationService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserEntity user){
        return authenticationService.verify(user);
    }


    @GetMapping("/users")
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserEntity updateUser) {
        return userRepository.findById(id).map(book -> {
            book.setUsername(updateUser.getUsername());
            book.setPassword(updateUser.getPassword());
            book.setEmail(updateUser.getEmail());
            book.setRole(updateUser.getRole());
            userRepository.save(book);
            return ResponseEntity.ok("User updated successfully!");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {

        return userRepository.findById(id).map(book -> {
            userRepository.delete(book);
            return ResponseEntity.ok("User deleted successfully!");
        }).orElseGet(() -> {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        });
    }
    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestBody Map<String, Long> request) {
        Long newRoleId = request.get("roleId");
        authenticationService.updateUserRole(id, newRoleId);
        return ResponseEntity.ok("Role updated successfully");
    }
}
