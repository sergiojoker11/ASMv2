/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sj11.asm.entities;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author SeRGiO11
 */
@Entity
@Table(name = "producto")
public class Producto {

    private Long id;
    private String nombre;
    private List<Formato> listaFormatos;

    public Producto() {
    }

    public Producto(String nombre, List<Formato> listaFormatos) {
        this.nombre = nombre;
        this.listaFormatos = listaFormatos;
    }

    public Producto(Long id, String nombre, List<Formato> listaFormatos) {
        this.id = id;
        this.nombre = nombre;
        this.listaFormatos = listaFormatos;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<Formato> getListaFormatos() {
        return listaFormatos;
    }

    public void setListaFormatos(List<Formato> listaFormatos) {
        this.listaFormatos = listaFormatos;
    }
}
