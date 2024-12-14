package Webfejlesztes_Projekt.BookRental.Service;

import Webfejlesztes_Projekt.BookRental.Entity.BorrowEntity;
import Webfejlesztes_Projekt.BookRental.Repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowServiceImpl implements BorrowService{
    @Autowired
    BorrowRepository borrowRepository;

    @Override
    public BorrowEntity saveBorrow(BorrowEntity borrow){
        return borrowRepository.save(borrow);
    }
}
