package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.URLType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the URLType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface URLTypeRepository extends JpaRepository<URLType, Long> {}
