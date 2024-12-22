package Webfejlesztes_Projekt.BookRental.Repository;

import Webfejlesztes_Projekt.BookRental.Entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findById(Long id);
}
