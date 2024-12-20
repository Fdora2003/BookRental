package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;

import java.util.List;

public interface BookService {
    BookEntity saveBook(BookEntity book);
    BookEntity addBook(BookEntity book);
    BookEntity updateBook(long id, BookEntity updatedBook);
    void deleteBook(long id);
    List<BookEntity> getAllBooks();

}
