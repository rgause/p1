package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TenantTypeURL;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TenantTypeURL entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenantTypeURLRepository extends JpaRepository<TenantTypeURL, Long> {}
