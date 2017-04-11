package sj11.asm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sj11.asm.entities.Producto;

/**
 *
 * @author SeRGiO11
 */
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
