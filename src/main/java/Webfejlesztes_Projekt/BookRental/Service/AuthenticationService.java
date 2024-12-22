package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.RoleEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.RoleRepository;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);
    public UserEntity register(UserEntity user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        RoleEntity role = roleRepository.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("Default role not found"));
        user.setRole(role);
        return userRepository.save(user);
    }


    public String verify(UserEntity user){
        Authentication authentication =
                manager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        return "Login fail";
    }
    @Transactional
    public void updateUserRole(Long userId, Long newRoleId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        RoleEntity newRole = roleRepository.findById(newRoleId)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        user.setRole(newRole);
        userRepository.save(user);
    }
}
