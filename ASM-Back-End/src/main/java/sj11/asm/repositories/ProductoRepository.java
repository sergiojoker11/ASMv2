package sj11.asm.repositories;

import java.util.List;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.Producto;

/**
 *
 * @author SeRGiO11
 */
@RepositoryRestResource
public interface ProductoRepository extends Repository<Producto, Long> {

    Producto save(Producto producto);

    Producto findOne(Long id);

    List<Producto> findAll();

    void delete(Long id);
}
