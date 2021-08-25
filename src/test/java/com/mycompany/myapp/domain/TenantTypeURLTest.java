package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TenantTypeURLTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TenantTypeURL.class);
        TenantTypeURL tenantTypeURL1 = new TenantTypeURL();
        tenantTypeURL1.setId(1L);
        TenantTypeURL tenantTypeURL2 = new TenantTypeURL();
        tenantTypeURL2.setId(tenantTypeURL1.getId());
        assertThat(tenantTypeURL1).isEqualTo(tenantTypeURL2);
        tenantTypeURL2.setId(2L);
        assertThat(tenantTypeURL1).isNotEqualTo(tenantTypeURL2);
        tenantTypeURL1.setId(null);
        assertThat(tenantTypeURL1).isNotEqualTo(tenantTypeURL2);
    }
}
