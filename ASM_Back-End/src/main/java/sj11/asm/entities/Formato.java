/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sj11.asm.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author SeRGiO11
 */
@Entity
public class Formato {

    private Long id;
    private int cantidad;
    private String unidadMedida;
    private Producto producto;

    public Formato() {
    }

    public Formato(Long id, int cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

    public Formato(Long id, int cantidad, String unidadMedida) {
        this.id = id;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
    }

    public Formato(Long id, int cantidad, String unidadMedida, Producto producto) {
        this.id = id;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.producto = producto;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "producto_id")
    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }
}
