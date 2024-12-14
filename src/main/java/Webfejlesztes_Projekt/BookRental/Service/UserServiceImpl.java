package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }
}
