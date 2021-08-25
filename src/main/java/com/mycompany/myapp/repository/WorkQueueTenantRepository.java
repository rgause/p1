package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkQueueTenant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkQueueTenant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkQueueTenantRepository extends JpaRepository<WorkQueueTenant, Long> {}
