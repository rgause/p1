package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TenantPropertyKey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TenantPropertyKey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenantPropertyKeyRepository extends JpaRepository<TenantPropertyKey, Long> {}
