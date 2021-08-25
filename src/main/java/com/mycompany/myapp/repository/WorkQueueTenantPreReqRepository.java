package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkQueueTenantPreReq;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkQueueTenantPreReq entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkQueueTenantPreReqRepository extends JpaRepository<WorkQueueTenantPreReq, Long> {}
