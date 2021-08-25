package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TenantType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TenantType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenantTypeRepository extends JpaRepository<TenantType, Long> {}
