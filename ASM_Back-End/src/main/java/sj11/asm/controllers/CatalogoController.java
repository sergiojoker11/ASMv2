package sj11.asm.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @RequestMapping(value = "productoes/updateProducto", method = RequestMethod.POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateProducto(@RequestPart Optional<MultipartFile> image, @RequestPart Producto producto) {
        try {
            if (image.isPresent()) {
                producto.setImage(image.get().getBytes());
            }
            Producto productoUpdated = productoRepository.save(producto);
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
