package Webfejlesztes_Projekt.BookRental.Repository;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.RentEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentRepository extends JpaRepository<RentEntity, Long> {

    Optional<RentEntity> findByBookAndUser(BookEntity book, UserEntity user);

    List<RentEntity> findByUser(UserEntity user);
}
