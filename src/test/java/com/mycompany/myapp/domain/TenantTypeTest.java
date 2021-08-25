package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TenantTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TenantType.class);
        TenantType tenantType1 = new TenantType();
        tenantType1.setId(1L);
        TenantType tenantType2 = new TenantType();
        tenantType2.setId(tenantType1.getId());
        assertThat(tenantType1).isEqualTo(tenantType2);
        tenantType2.setId(2L);
        assertThat(tenantType1).isNotEqualTo(tenantType2);
        tenantType1.setId(null);
        assertThat(tenantType1).isNotEqualTo(tenantType2);
    }
}
