package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TenantTypeURL;
import com.mycompany.myapp.repository.TenantTypeURLRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TenantTypeURLResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TenantTypeURLResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tenant-type-urls";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TenantTypeURLRepository tenantTypeURLRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTenantTypeURLMockMvc;

    private TenantTypeURL tenantTypeURL;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TenantTypeURL createEntity(EntityManager em) {
        TenantTypeURL tenantTypeURL = new TenantTypeURL().url(DEFAULT_URL);
        return tenantTypeURL;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TenantTypeURL createUpdatedEntity(EntityManager em) {
        TenantTypeURL tenantTypeURL = new TenantTypeURL().url(UPDATED_URL);
        return tenantTypeURL;
    }

    @BeforeEach
    public void initTest() {
        tenantTypeURL = createEntity(em);
    }

    @Test
    @Transactional
    void createTenantTypeURL() throws Exception {
        int databaseSizeBeforeCreate = tenantTypeURLRepository.findAll().size();
        // Create the TenantTypeURL
        restTenantTypeURLMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isCreated());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeCreate + 1);
        TenantTypeURL testTenantTypeURL = tenantTypeURLList.get(tenantTypeURLList.size() - 1);
        assertThat(testTenantTypeURL.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    void createTenantTypeURLWithExistingId() throws Exception {
        // Create the TenantTypeURL with an existing ID
        tenantTypeURL.setId(1L);

        int databaseSizeBeforeCreate = tenantTypeURLRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTenantTypeURLMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = tenantTypeURLRepository.findAll().size();
        // set the field null
        tenantTypeURL.setUrl(null);

        // Create the TenantTypeURL, which fails.

        restTenantTypeURLMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTenantTypeURLS() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        // Get all the tenantTypeURLList
        restTenantTypeURLMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tenantTypeURL.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)));
    }

    @Test
    @Transactional
    void getTenantTypeURL() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        // Get the tenantTypeURL
        restTenantTypeURLMockMvc
            .perform(get(ENTITY_API_URL_ID, tenantTypeURL.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tenantTypeURL.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL));
    }

    @Test
    @Transactional
    void getNonExistingTenantTypeURL() throws Exception {
        // Get the tenantTypeURL
        restTenantTypeURLMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTenantTypeURL() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();

        // Update the tenantTypeURL
        TenantTypeURL updatedTenantTypeURL = tenantTypeURLRepository.findById(tenantTypeURL.getId()).get();
        // Disconnect from session so that the updates on updatedTenantTypeURL are not directly saved in db
        em.detach(updatedTenantTypeURL);
        updatedTenantTypeURL.url(UPDATED_URL);

        restTenantTypeURLMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTenantTypeURL.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTenantTypeURL))
            )
            .andExpect(status().isOk());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
        TenantTypeURL testTenantTypeURL = tenantTypeURLList.get(tenantTypeURLList.size() - 1);
        assertThat(testTenantTypeURL.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    void putNonExistingTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tenantTypeURL.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTenantTypeURLWithPatch() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();

        // Update the tenantTypeURL using partial update
        TenantTypeURL partialUpdatedTenantTypeURL = new TenantTypeURL();
        partialUpdatedTenantTypeURL.setId(tenantTypeURL.getId());

        restTenantTypeURLMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTenantTypeURL.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTenantTypeURL))
            )
            .andExpect(status().isOk());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
        TenantTypeURL testTenantTypeURL = tenantTypeURLList.get(tenantTypeURLList.size() - 1);
        assertThat(testTenantTypeURL.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    void fullUpdateTenantTypeURLWithPatch() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();

        // Update the tenantTypeURL using partial update
        TenantTypeURL partialUpdatedTenantTypeURL = new TenantTypeURL();
        partialUpdatedTenantTypeURL.setId(tenantTypeURL.getId());

        partialUpdatedTenantTypeURL.url(UPDATED_URL);

        restTenantTypeURLMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTenantTypeURL.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTenantTypeURL))
            )
            .andExpect(status().isOk());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
        TenantTypeURL testTenantTypeURL = tenantTypeURLList.get(tenantTypeURLList.size() - 1);
        assertThat(testTenantTypeURL.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    void patchNonExistingTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tenantTypeURL.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isBadRequest());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTenantTypeURL() throws Exception {
        int databaseSizeBeforeUpdate = tenantTypeURLRepository.findAll().size();
        tenantTypeURL.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTenantTypeURLMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tenantTypeURL))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TenantTypeURL in the database
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTenantTypeURL() throws Exception {
        // Initialize the database
        tenantTypeURLRepository.saveAndFlush(tenantTypeURL);

        int databaseSizeBeforeDelete = tenantTypeURLRepository.findAll().size();

        // Delete the tenantTypeURL
        restTenantTypeURLMockMvc
            .perform(delete(ENTITY_API_URL_ID, tenantTypeURL.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TenantTypeURL> tenantTypeURLList = tenantTypeURLRepository.findAll();
        assertThat(tenantTypeURLList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
