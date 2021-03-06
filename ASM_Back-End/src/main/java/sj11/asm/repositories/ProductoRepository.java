package sj11.asm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.Producto;

/**
 *
 * @author SeRGiO11
 */
@RepositoryRestResource
public interface ProductoRepository extends CrudRepository<Producto, Long> {
}
