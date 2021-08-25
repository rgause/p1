package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkQueueTenantData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkQueueTenantData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkQueueTenantDataRepository extends JpaRepository<WorkQueueTenantData, Long> {}
