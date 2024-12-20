package Webfejlesztes_Projekt.BookRental.Service.Impl;

import Webfejlesztes_Projekt.BookRental.Entity.BookEntity;
import Webfejlesztes_Projekt.BookRental.Entity.BorrowEntity;
import Webfejlesztes_Projekt.BookRental.Entity.UserEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BorrowRepository;
import Webfejlesztes_Projekt.BookRental.Service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class BorrowServiceImpl implements BorrowService {
    @Autowired
    BorrowRepository repository;
    @Override
    public Optional<BorrowEntity> findByBookAndUser(BookEntity book, UserEntity user) {
        return repository.findByBookIdAndUserId(book, user);
    }

    @Override
    public void save(BorrowEntity borrowed) {
        repository.save(borrowed);
    }


}
