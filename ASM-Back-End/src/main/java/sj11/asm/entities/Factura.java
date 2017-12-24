package sj11.asm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
public class Factura implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private byte[] pdf;
    @ManyToOne
    private User user;

    public Factura() {
    }

    public Factura(User user, Date date, byte[] pdf) {
        this.user = user;
        this.date = date;
        this.pdf = pdf;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public byte[] getPdf() {
        return pdf;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Factura factura = (Factura) o;
        return Objects.equals(id, factura.id) &&
                Objects.equals(user, factura.user) &&
                Objects.equals(date, factura.date);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, user, date);
    }

    @Override
    public String toString() {
        return "Factura{" +
                "id=" + id +
                ", user=" + user +
                ", date=" + date +
                '}';
    }
}
