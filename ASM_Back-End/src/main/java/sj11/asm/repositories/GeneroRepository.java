package sj11.asm.repositories;

import java.util.List;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.Genero;

/**
 *
 * @author SeRGiO11
 */
@RepositoryRestResource
public interface GeneroRepository extends Repository<Genero, Long> {

    Genero save(Genero user);

    List<Genero> findAll();
}
