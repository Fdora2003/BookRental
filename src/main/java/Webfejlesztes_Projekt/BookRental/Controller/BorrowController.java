package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.BorrowEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import Webfejlesztes_Projekt.BookRental.Service.BorrowService;
import Webfejlesztes_Projekt.BookRental.Service.UserService;
import Webfejlesztes_Projekt.BookRental.Service.dto.BorrowDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
public class BorrowController {
    @Autowired
    private BorrowService borrowService;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @PostMapping("/rent")
    public ResponseEntity<String> borrowBook(@PathVariable Long bookId, Principal principal) {
        // Lekérdezzük a bejelentkezett felhasználót
        UserEntity user = userService.findByUsername(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Felhasználó nem található.");
        }

        // Lekérdezzük a könyvet az ID alapján
        Optional<BookEntity> bookOptional = bookService.findById(bookId);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A könyv nem található.");
        }

        BookEntity book = bookOptional.get();

        // Ellenőrizzük, hogy a könyv elérhető-e
        if (!book.isAvailable()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A könyv jelenleg nem elérhető.");
        }

        // Könyv elérhetőség állítása false-ra
        book.setAvailable(false);
        bookService.saveBook(book);

        // Kölcsönzés mentése
        BorrowEntity borrow = new BorrowEntity();
        borrow.setBook(book);
        borrow.setUser(user);
        borrowService.save(borrow);

        return ResponseEntity.ok("A könyv sikeresen kölcsönözve.");
    }

    @DeleteMapping("/return/{bookId}")
    public ResponseEntity<String> returnBook(@PathVariable Long bookId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bejelentkezés szükséges.");
        }

        // Felhasználó lekérdezése
        Optional<UserEntity> userEntity = Optional.ofNullable(userService.findByUsername(principal.getName()));
        if (userEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Felhasználó nem található.");
        }

        UserEntity user = userEntity.get();

        // Könyv lekérdezése
        Optional<BookEntity> bookEntity = bookService.findById(bookId);
        if (bookEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Könyv nem található.");
        }

        BookEntity book = bookEntity.get();

        // Kölcsönzési kapcsolat ellenőrzése
        Optional<BorrowEntity> borrowEntity = borrowService.findByBookAndUser(book, user);
        if (borrowEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A könyv nincs kölcsönözve a felhasználó által.");
        }

        // Kapcsolat törlése
        borrowService.delete(borrowEntity.get());

        // Könyv visszaállítása
        book.setAvailable(true);
        bookService.saveBook(book);

        return ResponseEntity.ok("Könyv sikeresen visszaadva.");
    }

}
