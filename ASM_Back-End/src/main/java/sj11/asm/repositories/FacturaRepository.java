package sj11.asm.repositories;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.Factura;

import java.util.List;

@RepositoryRestResource
public interface FacturaRepository extends Repository<Factura, Long> {

    Factura save(Factura factura);

    List<Factura> findAll();

    Factura findOne(Long id);

    void delete(Long id);
}
