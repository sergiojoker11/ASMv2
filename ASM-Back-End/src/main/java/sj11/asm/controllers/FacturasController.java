package sj11.asm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sj11.asm.entities.Factura;
import sj11.asm.repositories.FacturaRepository;

@RestController
public class FacturasController {

    @Autowired
    private FacturaRepository facturaRepository;

    @RequestMapping(value = "facturas/{id}/pdf.pdf", method = RequestMethod.GET)
    public ResponseEntity<?> getFacturaPdf(@PathVariable Long id) {
        Factura factura = facturaRepository.findOne(id);
        return new ResponseEntity<>(factura.getPdf(), HttpStatus.OK);
    }
}
