package sj11.asm.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sj11.asm.entities.User;

/**
 *
 * @author SeRGiO11
 */
@RepositoryRestResource
public interface UserRepository extends Repository<User, Long> {

    @Query(value = "SELECT * FROM user user "
            + "where user.username= BINARY ?1 "
            + "and user.password= BINARY ?2 ", nativeQuery = true)
    User findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    User save(User user);

    User findByEmail(String email);
}
