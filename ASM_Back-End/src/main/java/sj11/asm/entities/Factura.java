package sj11.asm.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class Factura implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private User user;
    private Date date;
    private byte[] pdf;

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
