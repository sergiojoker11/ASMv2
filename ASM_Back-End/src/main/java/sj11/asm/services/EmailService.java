package sj11.asm.services;

import java.util.Map;
import javax.mail.internet.MimeMessage;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

/**
 *
 * @author SeRGiO11
 */
@Service
public class EmailService {

    private JavaMailSender mailSender;
    private VelocityEngine velocityEngine;

    @Autowired
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Autowired
    public void setVelocityEngine(VelocityEngine velocityEngine) {
        this.velocityEngine = velocityEngine;
    }

    public void sendMail(final String toEmail, final String subject, final String templateFileName, final Map<String, Object> templateContext) {
        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setFrom("info@aceitunassanchezmontes.com");
            String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, "emailTemplates/" + templateFileName, "UTF-8", templateContext);
            message.setText(text, true);
        };
        this.mailSender.send(preparator);
    }
}
