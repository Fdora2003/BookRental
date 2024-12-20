package Webfejlesztes_Projekt.BookRental.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "borrow")
public class BorrowEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user_id;
    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book_id;

    public BorrowEntity(long id, UserEntity user_id, BookEntity book_id) {
        this.id = id;
        this.user_id = user_id;
        this.book_id = book_id;
    }

    public BorrowEntity() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUser_id() {
        return user_id;
    }

    public void setUser_id(UserEntity user_id) {
        this.user_id = user_id;
    }

    public BookEntity getBook_id() {
        return book_id;
    }

    public void setBook_id(BookEntity book_id) {
        this.book_id = book_id;
    }
}
