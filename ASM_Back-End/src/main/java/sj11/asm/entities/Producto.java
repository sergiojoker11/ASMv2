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

    private Integer id;
    private String nombre;
    private Set<Formato> listaFormatos;

    public Producto() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    public Set<Formato> getListaFormatos() {
        return listaFormatos;
    }

    public void setListaFormatos(Set<Formato> listaFormatos) {
        this.listaFormatos = listaFormatos;
    }
}
