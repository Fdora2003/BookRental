package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.RentEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Repository.RentRepository;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import Webfejlesztes_Projekt.BookRental.Service.Dto.RentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ReturnBookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RentRepository rentRepository;

    @GetMapping("/{user}/rented")
    public ResponseEntity<List<RentDto>> rentedBooksByUser(Principal principal) {
        UserEntity user = userRepository.findByUsername(principal.getName());
        List<RentEntity> rentedBooks = rentRepository.findByUser(user); // Itt a rentRepository-tól kérjük le

        List<RentDto> bookDtos = rentedBooks.stream()
                .map(book -> {
                    RentDto dto = new RentDto();
                    dto.setTitle(book.getBook().getTitle());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(bookDtos);
    }

    @PutMapping("/return")
    public ResponseEntity<RentDto> returnBook(@RequestBody RentDto rentDto, Principal principal) {
        String title = rentDto.getTitle();

        Optional<BookEntity> bookEntity = bookRepository.findByTitle(title);
        if (bookEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<UserEntity> userEntity = Optional.ofNullable(userRepository.findByUsername(principal.getName()));
        if (userEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        BookEntity book = bookEntity.get();
        UserEntity user = userEntity.get();

        Optional<RentEntity> borrowedEntity = rentRepository.findByBookAndUser(book, user);
        if (borrowedEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // Ha a kölcsönzés nem található
        }

        rentRepository.delete(borrowedEntity.get());

        book.setAvailable(true);
        bookRepository.save(book);

        RentDto responseDto = new RentDto();
        responseDto.setUsername(principal.getName());
        responseDto.setTitle(book.getTitle());

        return ResponseEntity.ok(responseDto);
    }
}
