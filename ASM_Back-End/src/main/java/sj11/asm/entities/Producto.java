/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sj11.asm.entities;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author SeRGiO11
 */
@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private Set<Formato> listaFormatos;

    public Producto() {
    }

    public Producto(String nombre, Set<Formato> listaFormatos) {
        this.nombre = nombre;
        this.listaFormatos = listaFormatos;
    }

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

    public Set<Formato> getListaFormatos() {
        return listaFormatos;
    }

    public void setListaFormatos(Set<Formato> listaFormatos) {
        this.listaFormatos = listaFormatos;
    }
}
