/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sj11.asm.entities;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author SeRGiO11
 */
@Entity
public class Producto {

    @Id
    private String nombre;
    @OneToMany(targetEntity = Formato.class, mappedBy = "id", fetch = FetchType.EAGER)
    private List<Formato> listaFormatos;

    public Producto(String nombre, List<Formato> listaFormatos) {
        this.nombre = nombre;
        this.listaFormatos = listaFormatos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Formato> getListaFormatos() {
        return listaFormatos;
    }

    public void setListaFormatos(List<Formato> listaFormatos) {
        this.listaFormatos = listaFormatos;
    }
}
