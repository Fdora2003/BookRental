package Webfejlesztes_Projekt.BookRental.Service.Impl;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    BookRepository bookRepository;

    @Override
    public BookEntity saveBook(BookEntity book) {
        return bookRepository.save(book);
    }


    @Override
    public BookEntity addBook(BookEntity book) {
        return bookRepository.save(book);
    }

    @Override
    public BookEntity updateBook(long id, BookEntity updatedBook) {
        Optional<BookEntity> existingBookOpt = bookRepository.findById(id);
        if (existingBookOpt.isPresent()) {
            BookEntity existingBook = existingBookOpt.get();
            // Frissítjük a könyv adatokat
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setGenre(updatedBook.getGenre());
            existingBook.setIsbn(updatedBook.getIsbn());
            // Mentés (frissítés)
            return bookRepository.save(existingBook);
        } else {
            throw new RuntimeException("A könyv nem található.");
        }
    }

    @Override
    public void deleteBook(long id) {
        bookRepository.deleteById(id);
    }

    @Override
        public List<BookEntity> getAllBooks () {
            return bookRepository.findAll();
        }

    @Override
    public Optional<BookEntity> findByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    @Override
    public Optional<BookEntity> findById(Long bookId) {
        return bookRepository.findById(bookId);
    }

    @Override
    public List<BookEntity> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

}

