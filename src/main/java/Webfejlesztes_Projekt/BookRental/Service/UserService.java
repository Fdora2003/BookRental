package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;

import java.util.List;

public interface UserService {
     UserEntity saveUser(UserEntity user);
     public List<UserEntity> getAllUser();
}
