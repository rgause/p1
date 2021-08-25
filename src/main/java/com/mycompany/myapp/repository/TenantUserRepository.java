package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TenantUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TenantUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenantUserRepository extends JpaRepository<TenantUser, Long> {}
