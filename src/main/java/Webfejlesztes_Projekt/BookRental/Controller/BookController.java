package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService service;

    @Autowired
    private BookRepository repository;

    // 1. Könyvek hozzáadása (Add a book)
    @PostMapping("/add")
    public ResponseEntity<BookEntity> addBook(@RequestBody BookEntity book) {
        BookEntity savedBook = service.addBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // 2. Könyvek törlése (Delete a book)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable long id) {
        try {
            service.deleteBook(id);
            return new ResponseEntity<>("Könyv sikeresen törölve!", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    // 3. Könyvek módosítása (Update a book)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBook(@PathVariable long id, @RequestBody BookEntity updatedBook) {
        try {
            // A könyvet frissítjük az id alapján
            BookEntity book = service.updateBook(id, updatedBook);
            return new ResponseEntity<>("Könyv sikeresen módosítva!", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
