package sj11.asm.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sj11.asm.entities.User;
import sj11.asm.repositories.UserRepository;
import sj11.asm.services.EmailService;

/**
 *
 * @author SeRGiO11
 */
@RestController
public class UserController {

    UserRepository userRepository;
    EmailService emailService;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    @RequestMapping(value = "remindPassword", method = RequestMethod.POST)
    public ResponseEntity<?> remindPassword(@RequestBody String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        Map<String, Object> templateContext = new HashMap<>();
        templateContext.put("user", user);
        try {
            emailService.sendMail(user.getEmail(), "Aceitunas Sánchez Montes: solicitud de recordatorio de password", "passwordRemider.vm", templateContext);
        } catch (RuntimeException runExc) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
