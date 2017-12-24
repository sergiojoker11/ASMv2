package sj11.asm.controllers;

import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sj11.asm.entities.Factura;
import sj11.asm.entities.Pedido;
import sj11.asm.repositories.FacturaRepository;
import sj11.asm.services.EmailService;
import sj11.asm.services.PdfService;

import java.io.IOException;
import java.util.*;

@RestController
@PropertySource("classpath:application.properties")
public class PedidoController {

    @Autowired
    private PdfService pdfService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private FacturaRepository facturaRepository;

    @Value("${aceitunassanchezmontes.emailoutgoing.to}")
    private String emailTo;

    @RequestMapping(value = "pedidos", method = RequestMethod.POST)
    public ResponseEntity<?> checkout(@RequestBody Pedido pedido) {
        byte [] facturapdf;
        try {
            facturapdf = pdfService.createFactura(pedido);
        } catch (IOException | DocumentException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Factura factura = new Factura(pedido.getUser(), new Date(), facturapdf);
        Factura facturaStored = facturaRepository.save(factura);

        Map<String, Object> templateContext = new HashMap<>();
        templateContext.put("user", pedido.getUser());
        emailService.sendMail(Arrays.asList(pedido.getUser().getEmail(), emailTo).toArray(new String[0]), "Aceitunas Sánchez Montes: pedido realizado", "pedidoRealizado.vm", templateContext, Optional.of(facturapdf), Optional.of("facturaASM.pdf"));
        return new ResponseEntity<>(facturaStored.getId(), HttpStatus.OK);
    }
}
