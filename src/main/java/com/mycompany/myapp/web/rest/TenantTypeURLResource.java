package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TenantTypeURL;
import com.mycompany.myapp.repository.TenantTypeURLRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TenantTypeURL}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TenantTypeURLResource {

    private final Logger log = LoggerFactory.getLogger(TenantTypeURLResource.class);

    private static final String ENTITY_NAME = "tenantTypeURL";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TenantTypeURLRepository tenantTypeURLRepository;

    public TenantTypeURLResource(TenantTypeURLRepository tenantTypeURLRepository) {
        this.tenantTypeURLRepository = tenantTypeURLRepository;
    }

    /**
     * {@code POST  /tenant-type-urls} : Create a new tenantTypeURL.
     *
     * @param tenantTypeURL the tenantTypeURL to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tenantTypeURL, or with status {@code 400 (Bad Request)} if the tenantTypeURL has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tenant-type-urls")
    public ResponseEntity<TenantTypeURL> createTenantTypeURL(@Valid @RequestBody TenantTypeURL tenantTypeURL) throws URISyntaxException {
        log.debug("REST request to save TenantTypeURL : {}", tenantTypeURL);
        if (tenantTypeURL.getId() != null) {
            throw new BadRequestAlertException("A new tenantTypeURL cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TenantTypeURL result = tenantTypeURLRepository.save(tenantTypeURL);
        return ResponseEntity
            .created(new URI("/api/tenant-type-urls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tenant-type-urls/:id} : Updates an existing tenantTypeURL.
     *
     * @param id the id of the tenantTypeURL to save.
     * @param tenantTypeURL the tenantTypeURL to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tenantTypeURL,
     * or with status {@code 400 (Bad Request)} if the tenantTypeURL is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tenantTypeURL couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tenant-type-urls/{id}")
    public ResponseEntity<TenantTypeURL> updateTenantTypeURL(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TenantTypeURL tenantTypeURL
    ) throws URISyntaxException {
        log.debug("REST request to update TenantTypeURL : {}, {}", id, tenantTypeURL);
        if (tenantTypeURL.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tenantTypeURL.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tenantTypeURLRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TenantTypeURL result = tenantTypeURLRepository.save(tenantTypeURL);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tenantTypeURL.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tenant-type-urls/:id} : Partial updates given fields of an existing tenantTypeURL, field will ignore if it is null
     *
     * @param id the id of the tenantTypeURL to save.
     * @param tenantTypeURL the tenantTypeURL to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tenantTypeURL,
     * or with status {@code 400 (Bad Request)} if the tenantTypeURL is not valid,
     * or with status {@code 404 (Not Found)} if the tenantTypeURL is not found,
     * or with status {@code 500 (Internal Server Error)} if the tenantTypeURL couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tenant-type-urls/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TenantTypeURL> partialUpdateTenantTypeURL(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TenantTypeURL tenantTypeURL
    ) throws URISyntaxException {
        log.debug("REST request to partial update TenantTypeURL partially : {}, {}", id, tenantTypeURL);
        if (tenantTypeURL.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tenantTypeURL.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tenantTypeURLRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TenantTypeURL> result = tenantTypeURLRepository
            .findById(tenantTypeURL.getId())
            .map(
                existingTenantTypeURL -> {
                    if (tenantTypeURL.getUrl() != null) {
                        existingTenantTypeURL.setUrl(tenantTypeURL.getUrl());
                    }

                    return existingTenantTypeURL;
                }
            )
            .map(tenantTypeURLRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tenantTypeURL.getId().toString())
        );
    }

    /**
     * {@code GET  /tenant-type-urls} : get all the tenantTypeURLS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tenantTypeURLS in body.
     */
    @GetMapping("/tenant-type-urls")
    public List<TenantTypeURL> getAllTenantTypeURLS() {
        log.debug("REST request to get all TenantTypeURLS");
        return tenantTypeURLRepository.findAll();
    }

    /**
     * {@code GET  /tenant-type-urls/:id} : get the "id" tenantTypeURL.
     *
     * @param id the id of the tenantTypeURL to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tenantTypeURL, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tenant-type-urls/{id}")
    public ResponseEntity<TenantTypeURL> getTenantTypeURL(@PathVariable Long id) {
        log.debug("REST request to get TenantTypeURL : {}", id);
        Optional<TenantTypeURL> tenantTypeURL = tenantTypeURLRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tenantTypeURL);
    }

    /**
     * {@code DELETE  /tenant-type-urls/:id} : delete the "id" tenantTypeURL.
     *
     * @param id the id of the tenantTypeURL to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tenant-type-urls/{id}")
    public ResponseEntity<Void> deleteTenantTypeURL(@PathVariable Long id) {
        log.debug("REST request to delete TenantTypeURL : {}", id);
        tenantTypeURLRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
