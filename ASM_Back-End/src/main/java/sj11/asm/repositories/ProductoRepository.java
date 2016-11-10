package sj11.asm.repositories;

import org.springframework.data.repository.Repository;
import sj11.asm.entities.Producto;

/**
 *
 * @author SeRGiO11
 */
public interface ProductoRepository extends Repository<Producto, String> {

    Producto save(Producto producto);
}
