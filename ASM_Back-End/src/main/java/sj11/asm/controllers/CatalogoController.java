package sj11.asm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sj11.asm.entities.Genero;
import sj11.asm.repositories.GeneroRepository;

/**
 *
 * @author SeRGiO11
 */
@RestController
public class CatalogoController {

    GeneroRepository generoRepository;

    @Autowired
    public void setGeneroRepository(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    @RequestMapping(value = "generoes/updateGenero", method = RequestMethod.POST)
    public ResponseEntity<?> updateGenero(@RequestBody Genero genero) {
        Genero generoFromDB = generoRepository.findOne(genero.getId());
        generoFromDB.setName(genero.getName());
        Genero generoUpdated = generoRepository.save(generoFromDB);
        return new ResponseEntity<>(generoUpdated, HttpStatus.OK);
    }
}
