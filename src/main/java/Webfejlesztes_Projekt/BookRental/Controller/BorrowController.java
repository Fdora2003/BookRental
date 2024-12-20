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

    @PostMapping("/borrow/{bookId}")
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

}
