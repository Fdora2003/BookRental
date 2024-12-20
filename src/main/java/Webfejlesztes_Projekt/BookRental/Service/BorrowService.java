package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.BorrowEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public interface BorrowService {
    Optional<BorrowEntity> findByBookAndUser(BookEntity book, UserEntity user);

    void save(BorrowEntity borrowed);


    void delete(BorrowEntity borrowEntity);
}
