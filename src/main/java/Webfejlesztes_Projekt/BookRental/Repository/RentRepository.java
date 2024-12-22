package Webfejlesztes_Projekt.BookRental.Repository;

import Webfejlesztes_Projekt.BookRental.Entity.RentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentRepository extends JpaRepository<RentEntity, Long> {

}
