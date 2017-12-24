package sj11.asm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sj11.asm.entities.User;
import sj11.asm.repositories.UserRepository;

/**
 *
 * @author SeRGiO11
 */
@RestController
public class AuthenticationController {

    UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody User user) {
        User userFound = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (userFound == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        userFound.setPassword(null);
        return new ResponseEntity<>(userFound, HttpStatus.OK);
    }
}