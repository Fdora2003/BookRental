package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface BookService {
    BookEntity saveBook(BookEntity book);
    BookEntity addBook(BookEntity book);
    BookEntity updateBook(long id, BookEntity updatedBook);
    void deleteBook(long id);
    List<BookEntity> getAllBooks();

    Optional<BookEntity> findByTitle(String title);


    Optional<BookEntity> findById(Long bookId);

    List<BookEntity> getAvailableBooks();
}
