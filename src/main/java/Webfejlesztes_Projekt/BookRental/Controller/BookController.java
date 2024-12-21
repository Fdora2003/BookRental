package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @PostMapping()
    public ResponseEntity<String> createBook(@RequestBody BookEntity book) {
        if (book.getTitle() == null || book.getTitle().isEmpty() ||
                book.getAuthor() == null || book.getAuthor().isEmpty() ||
                book.getGenre() == null || book.getGenre().isEmpty() ||
                book.getIsbn() == null || book.getIsbn().signum() <= 0) {
            return ResponseEntity.badRequest().body("All fields are required and cannot be empty.");
        }
        try {
            bookRepository.save(book);
            return ResponseEntity.ok("Book added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add book.");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBook(@PathVariable Long id, @RequestBody BookEntity updateBook) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(updateBook.getTitle());
            book.setAuthor(updateBook.getAuthor());
            book.setGenre(updateBook.getGenre());
            book.setAvailable(updateBook.isAvailable());
            book.setIsbn(updateBook.getIsbn());
            bookRepository.save(book);
            return ResponseEntity.ok("User updated successfully!");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {

        return bookRepository.findById(id).map(book -> {
            bookRepository.delete(book);
            return ResponseEntity.ok("User deleted successfully!");
        }).orElseGet(() -> {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        });
    }

    @GetMapping()
    public List<BookEntity> getAllBooks() {
        return bookService.getAllBooks();
    }
}
