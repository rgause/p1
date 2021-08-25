package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.URL;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the URL entity.
 */
@SuppressWarnings("unused")
@Repository
public interface URLRepository extends JpaRepository<URL, Long> {}
