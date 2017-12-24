package sj11.asm.services;

import java.io.InputStream;
import java.util.Map;
import java.util.Optional;
import javax.mail.internet.MimeMessage;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
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
@PropertySource("classpath:application.properties")
public class EmailService {

    private JavaMailSender mailSender;
    private VelocityEngine velocityEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Autowired
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Autowired
    public void setVelocityEngine(VelocityEngine velocityEngine) {
        this.velocityEngine = velocityEngine;
    }

    public void sendMail(final String[] toEmail, final String subject, final String templateFileName, final Map<String, Object> templateContext, final Optional<byte[]> attachment, final Optional<String> attachmentFilename) {
        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, attachment.isPresent());
            message.setTo(toEmail);
            if (attachmentFilename.isPresent() && attachment.isPresent()) {
                message.addAttachment(attachmentFilename.get(), new ByteArrayResource(attachment.get()));
            }
            message.setSubject(subject);
            message.setFrom(emailFrom);
            String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, "emailTemplates/" + templateFileName, "UTF-8", templateContext);
            message.setText(text, true);
        };
        this.mailSender.send(preparator);
    }
}
