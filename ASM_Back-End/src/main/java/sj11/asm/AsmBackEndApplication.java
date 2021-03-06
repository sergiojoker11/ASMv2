package sj11.asm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class})
public class AsmBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(AsmBackEndApplication.class, args);
    }
}
