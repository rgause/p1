package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkTemplateRepository extends JpaRepository<WorkTemplate, Long> {}
