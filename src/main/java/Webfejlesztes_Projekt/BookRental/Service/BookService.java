package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface BookService {
    BookEntity saveBook(BookEntity book);

    Optional<BookEntity> findById(Long bookId);

    List<BookEntity> getAvailableBooks();

    List<BookEntity> getAllBooks();
}
