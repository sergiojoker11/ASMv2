package sj11.asm.config;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.EntityManagerFactory;
import javax.persistence.metamodel.ManagedType;
import javax.persistence.metamodel.Metamodel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 *
 * @author SeRGiO11
 */
@Configuration
public class RestConfig extends RepositoryRestMvcConfiguration {

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer(EntityManagerFactory entityManagerFactory) {
        List<Class<?>> entityClasses = getAllManagedEntityTypes(entityManagerFactory);
        return new RepositoryRestConfigurerAdapter() {
            @Override
            public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
                for (Class<?> entityClass : entityClasses) {
                    config.exposeIdsFor(entityClass);
                }
            }
        };
    }

    private List<Class<?>> getAllManagedEntityTypes(EntityManagerFactory entityManagerFactory) {
        List<Class<?>> entityClasses = new ArrayList<>();
        Metamodel metamodel = entityManagerFactory.getMetamodel();
        for (ManagedType<?> managedType : metamodel.getManagedTypes()) {
            Class<?> javaType = managedType.getJavaType();
            if (javaType.isAnnotationPresent(Entity.class)) {
                entityClasses.add(managedType.getJavaType());
            }
        }
        return entityClasses;
    }
}
