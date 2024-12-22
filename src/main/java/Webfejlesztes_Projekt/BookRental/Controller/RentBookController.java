package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.RentEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Repository.RentRepository;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import Webfejlesztes_Projekt.BookRental.Service.Dto.RentDto;
import Webfejlesztes_Projekt.BookRental.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class RentBookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RentRepository rentalRepository;
    @Autowired
    UserService userService;
    @Autowired
    BookService bookService;

    @GetMapping()
    public List<BookEntity> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    // Könyv bérlése
    @PutMapping("/rent")
    public ResponseEntity<RentDto> bookEntityResponseEntity(@RequestBody RentDto rentDto, Principal principal) {
        String title = rentDto.getTitle();
        Optional<BookEntity> bookEntity = bookRepository.findByTitle(title);

        // Felhasználó lekérdezése
        Optional<UserEntity> userEntity = Optional.ofNullable(userRepository.findByUsername(principal.getName()));
        if (userEntity.isEmpty()) {
            // Ha nincs ilyen felhasználó
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        UserEntity user = userEntity.get();

        // Könyv lekérdezése
        if (bookEntity.isPresent()) {
            BookEntity book = bookEntity.get();

            // Már kölcsönzött
            if (!book.isAvailable()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            // Könyv frissítése
            book.setAvailable(false);
            bookRepository.save(book);

            RentEntity borrowed = new RentEntity();
            borrowed.setBook(book);
            borrowed.setUser(user);
            rentalRepository.save(borrowed);

            //DTO
            RentDto dto = new RentDto();
            dto.setUsername(principal.getName());
            dto.setTitle(book.getTitle());

            return ResponseEntity.ok(rentDto);
        }

        // Nincs ilyen könyv
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
