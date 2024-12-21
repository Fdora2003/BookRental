package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
     UserEntity saveUser(UserEntity user);
     List<UserEntity> getAllUser();
    UserEntity findByUsername(String name);


    UserEntity createUser(UserEntity user);

    UserEntity updateUser(Long id, UserEntity user);

    boolean deleteUser(Long id);
}
