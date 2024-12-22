package Webfejlesztes_Projekt.BookRental.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "RENT")
public class RentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book;

    public RentEntity(UserEntity user, BookEntity book) {
    }

    public RentEntity(long id, UserEntity user, BookEntity book) {
        this.id = id;
        this.user = user;
        this.book = book;
    }

    public RentEntity() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }
}
