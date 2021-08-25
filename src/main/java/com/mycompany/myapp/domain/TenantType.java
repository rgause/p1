package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A TenantType.
 */
@Entity
@Table(name = "tenant_type")
public class TenantType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "tenantType")
    @JsonIgnoreProperties(value = { "tenantType" }, allowSetters = true)
    private Set<TenantTypeURL> tenantTypeURLS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TenantType id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public TenantType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TenantTypeURL> getTenantTypeURLS() {
        return this.tenantTypeURLS;
    }

    public TenantType tenantTypeURLS(Set<TenantTypeURL> tenantTypeURLS) {
        this.setTenantTypeURLS(tenantTypeURLS);
        return this;
    }

    public TenantType addTenantTypeURL(TenantTypeURL tenantTypeURL) {
        this.tenantTypeURLS.add(tenantTypeURL);
        tenantTypeURL.setTenantType(this);
        return this;
    }

    public TenantType removeTenantTypeURL(TenantTypeURL tenantTypeURL) {
        this.tenantTypeURLS.remove(tenantTypeURL);
        tenantTypeURL.setTenantType(null);
        return this;
    }

    public void setTenantTypeURLS(Set<TenantTypeURL> tenantTypeURLS) {
        if (this.tenantTypeURLS != null) {
            this.tenantTypeURLS.forEach(i -> i.setTenantType(null));
        }
        if (tenantTypeURLS != null) {
            tenantTypeURLS.forEach(i -> i.setTenantType(this));
        }
        this.tenantTypeURLS = tenantTypeURLS;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TenantType)) {
            return false;
        }
        return id != null && id.equals(((TenantType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TenantType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
