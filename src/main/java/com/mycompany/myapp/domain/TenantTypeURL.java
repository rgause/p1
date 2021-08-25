package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A TenantTypeURL.
 */
@Entity
@Table(name = "tenant_type_url")
public class TenantTypeURL implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @ManyToOne
    @JsonIgnoreProperties(value = { "tenantTypeURLS" }, allowSetters = true)
    private TenantType tenantType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TenantTypeURL id(Long id) {
        this.id = id;
        return this;
    }

    public String getUrl() {
        return this.url;
    }

    public TenantTypeURL url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TenantType getTenantType() {
        return this.tenantType;
    }

    public TenantTypeURL tenantType(TenantType tenantType) {
        this.setTenantType(tenantType);
        return this;
    }

    public void setTenantType(TenantType tenantType) {
        this.tenantType = tenantType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TenantTypeURL)) {
            return false;
        }
        return id != null && id.equals(((TenantTypeURL) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TenantTypeURL{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
