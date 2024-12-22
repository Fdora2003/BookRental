package Webfejlesztes_Projekt.BookRental.Controller;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BookRepository;
import Webfejlesztes_Projekt.BookRental.Repository.UserRepository;
import Webfejlesztes_Projekt.BookRental.Service.BookService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;
    @Autowired
    UserRepository userRepository;
    @GetMapping()
    public List<BookEntity> getAllBooks() {
        return bookService.getAllBooks();
    }


}
