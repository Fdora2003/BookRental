package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
     UserEntity saveUser(UserEntity user);
     List<UserEntity> getAllUser();

    UserEntity findByUsername(String name);


}
