package sj11.asm.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sj11.asm.entities.Factura;
import sj11.asm.entities.Pedido;

import java.util.Date;

@RestController
public class PedidoController {

    @RequestMapping(value = "pedidos", method = RequestMethod.POST)
    public ResponseEntity<?> checkout(@RequestBody Pedido pedido) {
        System.out.println("Pedido recibido"+ pedido);
        //Generar factura PDF
        //Persistir facturar
        byte [] facturapdf = {};
        Factura factura = new Factura(pedido.getUser(), new Date(), facturapdf);
        //Devolver id de la factura
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
