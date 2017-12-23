package sj11.asm.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import sj11.asm.classes.GeneroNotPersisted;
import sj11.asm.entities.Formato;
import sj11.asm.entities.Pedido;
import sj11.asm.entities.Producto;
import sj11.asm.entities.User;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class PdfService {

    public byte[] createFactura(Pedido pedido) throws IOException, DocumentException {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();
            document.add(getLogoEmpresaUserTable(pedido));
            document.add(new Paragraph("\n"));
            document.add(getDeliveryAndDatesTable(pedido));
            document.add(new Paragraph("\n"));
            document.add(getPedidoTable(pedido));
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            throw e;
        }
        document.close();
        return outputStream.toByteArray();
    }

    private PdfPTable getLogoEmpresaUserTable(Pedido pedido) throws IOException, BadElementException {
        PdfPTable logoEmpresaUserTable = new PdfPTable(2);
        logoEmpresaUserTable.getDefaultCell().setBorder(0);
        Image logo = Image.getInstance(getLogo());
        logo.setAlignment(Chunk.ALIGN_MIDDLE);
        logoEmpresaUserTable.addCell(logo);
        logoEmpresaUserTable.addCell("");
        logoEmpresaUserTable.addCell(getDatosEmpresa());
        logoEmpresaUserTable.addCell(getDatosUser(pedido.getUser()));
        return logoEmpresaUserTable;
    }

    private PdfPTable getDeliveryAndDatesTable(Pedido pedido) {
        PdfPTable deliveryAndDatesTable = new PdfPTable(2);
        deliveryAndDatesTable.getDefaultCell().setBorder(0);
        deliveryAndDatesTable.addCell("Fecha:");
        deliveryAndDatesTable.addCell(String.valueOf(new Date()));
        deliveryAndDatesTable.addCell("Fecha de entrega deseada:");
        deliveryAndDatesTable.addCell(String.valueOf(pedido.getDeliveryDate()));
        deliveryAndDatesTable.addCell("Lugar de entrega deseado:");
        deliveryAndDatesTable.addCell(pedido.getDeliveryAddress());
        deliveryAndDatesTable.addCell("Comentarios del pedido:");
        deliveryAndDatesTable.addCell("");
        PdfPCell commentsDoubleCell = new PdfPCell(new Phrase(pedido.getComments()));
        commentsDoubleCell.setBorder(0);
        commentsDoubleCell.setColspan(2);
        deliveryAndDatesTable.addCell(commentsDoubleCell);
        deliveryAndDatesTable.completeRow();
        return deliveryAndDatesTable;
    }

    private PdfPTable getPedidoTable(Pedido pedido) {
        PdfPTable pedidoTable = new PdfPTable(2);
        int[] headerWidths = {70, 30};
        try {
            pedidoTable.setWidths(headerWidths);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        pedidoTable.getDefaultCell().setBorder(0);
        PdfPCell descripcionCell = new PdfPCell();
        descripcionCell.setBorderWidthBottom(1.0f);
        descripcionCell.addElement(new Phrase("Descripción"));
        pedidoTable.addCell(descripcionCell);
        PdfPCell cantidadCell = new PdfPCell();
        cantidadCell.setBorderWidthBottom(1.0f);
        cantidadCell.addElement(new Phrase("Cantidad"));
        pedidoTable.addCell(cantidadCell);
        for (GeneroNotPersisted genero : pedido.getItems()) {
            PdfPCell generoCell = new PdfPCell();
            generoCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            generoCell.setBorder(0);
            generoCell.addElement(new Phrase("> " + genero.getName()));
            pedidoTable.addCell(generoCell);
            pedidoTable.addCell("");
            for (Producto producto : genero.getProductosList()) {
                PdfPCell productoCell = new PdfPCell();
                productoCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                productoCell.setBorder(0);
                productoCell.addElement(new Phrase("    - " + producto.getNombre()));
                pedidoTable.addCell(productoCell);
                pedidoTable.addCell("");
                for (Formato formato : producto.getListaFormatos()) {
                    PdfPCell formatoCell1 = new PdfPCell();
                    formatoCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    formatoCell1.setBorder(0);
                    formatoCell1.addElement(new Phrase("        · " + formato.getCantidad() + " " + formato.getUnidadMedida()));
                    pedidoTable.addCell(formatoCell1);
                    PdfPCell formatoCell2 = new PdfPCell();
                    formatoCell2.setHorizontalAlignment(Element.ALIGN_CENTER);
                    formatoCell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    formatoCell2.addElement(new Phrase(String.valueOf(formato.getQuantity())));
                    pedidoTable.addCell(formatoCell2);
                }
            }
        }
        return pedidoTable;
    }

    private byte[] getLogo() throws IOException {
        return IOUtils.toByteArray(new ClassPathResource("logo.jpg").getInputStream());
    }

    private String getDatosEmpresa() {
        List<String> datosEmpresa = Arrays.asList("Aceitunas Sanchez Montes S.L.", "Poligono Monte Real", "C/Rio Manzanares Nº15-17", "28970 Humanes de Madrid", "C.I.F.:B86628534");
        return String.join("\n", datosEmpresa);
    }

    private String getDatosUser(User user) {
        List<String> datosUser = Arrays.asList("Datos cliente:", user.getName(), user.getEmail(), user.getPhone(), user.getPhone2());
        return String.join("\n", datosUser);
    }
}
