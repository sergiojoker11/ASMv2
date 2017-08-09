package sj11.asm.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sj11.asm.entities.Formato;
import sj11.asm.entities.Genero;
import sj11.asm.entities.Producto;
import sj11.asm.repositories.GeneroRepository;
import sj11.asm.repositories.ProductoRepository;

/**
 *
 * @author SeRGiO11
 */
@RestController
public class CatalogoController {

    GeneroRepository generoRepository;
    ProductoRepository productoRepository;

    @Autowired
    public void setGeneroRepository(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    @Autowired
    public void setProductoRepository(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @RequestMapping(value = "generoes/updateGenero", method = RequestMethod.POST)
    public ResponseEntity<?> updateGenero(@RequestBody Genero genero) {
        Genero generoFromDB = generoRepository.findOne(genero.getId());
        generoFromDB.setName(genero.getName());
        Genero generoUpdated = generoRepository.save(generoFromDB);
        return new ResponseEntity<>(generoUpdated, HttpStatus.OK);
    }

    @RequestMapping(value = "productoes/updateProducto", method = RequestMethod.POST)
    public ResponseEntity<?> updateProducto(@RequestParam Optional<MultipartFile> image, @RequestParam Long id, @RequestParam String nombre, @RequestParam List<Formato> listaFormatos) {
        try {
            Producto productoFromDB = productoRepository.findOne(id);
            productoFromDB.setNombre(nombre);
            if (image.isPresent()) {
                productoFromDB.setImage(image.get().getBytes());
            }
            productoFromDB.setListaFormatos(listaFormatos);
            Producto productoUpdated = productoRepository.save(productoFromDB);
            return new ResponseEntity<>(productoUpdated, HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>("Hubo un error obteniendo los datos de la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "productoes/{id}/image", method = RequestMethod.GET)
    public ResponseEntity<?> getProductoImage(@PathVariable Long id) {
        Producto productoFromDB = productoRepository.findOne(id);
        return new ResponseEntity<>(productoFromDB.getImage(), HttpStatus.OK);
    }
}
