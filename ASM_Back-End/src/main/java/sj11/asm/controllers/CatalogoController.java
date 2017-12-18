package sj11.asm.controllers;

import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @RequestMapping(value = "productoes/{id}/image", method = RequestMethod.POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProductoImage(@RequestPart Optional<MultipartFile> image, @PathVariable Long id) {
        try {
            Producto productoFromDB = productoRepository.findOne(id);
            if (image.isPresent()) {
                productoFromDB.setImage(image.get().getBytes());
            } else {
                productoFromDB.setImage(null);
            }
            Producto productoUpdated = productoRepository.save(productoFromDB);
            return new ResponseEntity<>(productoUpdated, HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>("Hubo un error procesando los datos de la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "productoes/{id}/image", method = RequestMethod.GET)
    public ResponseEntity<?> getProductoImage(@PathVariable Long id) {
        Producto productoFromDB = productoRepository.findOne(id);
        return new ResponseEntity<>(productoFromDB.getImage(), HttpStatus.OK);
    }
}
