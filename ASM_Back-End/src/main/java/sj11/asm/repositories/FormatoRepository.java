package sj11.asm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.Formato;

/**
 *
 * @author SeRGiO11
 */
@RepositoryRestResource(exported = false)
public interface FormatoRepository extends CrudRepository<Formato, Long> {

}
