package sj11.asm.entities;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Pedido {

    private User user;
    private String deliveryAddress;
    private Date deliveryDate;
    private String comments;
    private List<Genero> items;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public List<Genero> getItems() {
        return items;
    }

    public void setItems(List<Genero> items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pedido pedido = (Pedido) o;
        return Objects.equals(user, pedido.user) &&
                Objects.equals(deliveryAddress, pedido.deliveryAddress) &&
                Objects.equals(deliveryDate, pedido.deliveryDate) &&
                Objects.equals(comments, pedido.comments) &&
                Objects.equals(items, pedido.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, deliveryAddress, deliveryDate, comments, items);
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "user=" + user +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", deliveryDate=" + deliveryDate +
                ", comments='" + comments + '\'' +
                ", items=" + items +
                '}';
    }
}
