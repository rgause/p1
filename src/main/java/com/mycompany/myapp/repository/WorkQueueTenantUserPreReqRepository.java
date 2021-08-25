package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkQueueTenantUserPreReq;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkQueueTenantUserPreReq entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkQueueTenantUserPreReqRepository extends JpaRepository<WorkQueueTenantUserPreReq, Long> {}
