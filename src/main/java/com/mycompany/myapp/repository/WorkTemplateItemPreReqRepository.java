package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WorkTemplateItemPreReq;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WorkTemplateItemPreReq entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkTemplateItemPreReqRepository extends JpaRepository<WorkTemplateItemPreReq, Long> {}
