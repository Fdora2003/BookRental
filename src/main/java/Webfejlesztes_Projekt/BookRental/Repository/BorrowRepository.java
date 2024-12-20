package Webfejlesztes_Projekt.BookRental.Repository;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.BorrowEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRepository extends JpaRepository<BorrowEntity, Long> {
    List<BorrowEntity> findAllByBook_Id(Long book_id);
    Optional<BorrowEntity> findByBookIdAndUserId(BookEntity book, UserEntity user);
}
