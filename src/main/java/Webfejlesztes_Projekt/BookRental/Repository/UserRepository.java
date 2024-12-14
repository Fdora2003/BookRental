package Webfejlesztes_Projekt.BookRental.Repository;

import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
