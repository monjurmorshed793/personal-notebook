package org.notebook.web.rest;

import org.notebook.PersonalNotebookApp;

import org.notebook.domain.YearlyPlan;
import org.notebook.repository.YearlyPlanRepository;
import org.notebook.service.YearlyPlanService;
import org.notebook.repository.search.YearlyPlanSearchRepository;
import org.notebook.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.notebook.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the YearlyPlanResource REST controller.
 *
 * @see YearlyPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PersonalNotebookApp.class)
public class YearlyPlanResourceIntTest {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final String DEFAULT_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_PLAN = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    @Autowired
    private YearlyPlanRepository yearlyPlanRepository;

    @Autowired
    private YearlyPlanService yearlyPlanService;

    @Autowired
    private YearlyPlanSearchRepository yearlyPlanSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restYearlyPlanMockMvc;

    private YearlyPlan yearlyPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YearlyPlanResource yearlyPlanResource = new YearlyPlanResource(yearlyPlanService);
        this.restYearlyPlanMockMvc = MockMvcBuilders.standaloneSetup(yearlyPlanResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static YearlyPlan createEntity() {
        YearlyPlan yearlyPlan = new YearlyPlan()
            .year(DEFAULT_YEAR)
            .plan(DEFAULT_PLAN)
            .userId(DEFAULT_USER_ID);
        return yearlyPlan;
    }

    @Before
    public void initTest() {
        yearlyPlanRepository.deleteAll();
        yearlyPlanSearchRepository.deleteAll();
        yearlyPlan = createEntity();
    }

    @Test
    public void createYearlyPlan() throws Exception {
        int databaseSizeBeforeCreate = yearlyPlanRepository.findAll().size();

        // Create the YearlyPlan
        restYearlyPlanMockMvc.perform(post("/api/yearly-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearlyPlan)))
            .andExpect(status().isCreated());

        // Validate the YearlyPlan in the database
        List<YearlyPlan> yearlyPlanList = yearlyPlanRepository.findAll();
        assertThat(yearlyPlanList).hasSize(databaseSizeBeforeCreate + 1);
        YearlyPlan testYearlyPlan = yearlyPlanList.get(yearlyPlanList.size() - 1);
        assertThat(testYearlyPlan.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testYearlyPlan.getPlan()).isEqualTo(DEFAULT_PLAN);
        assertThat(testYearlyPlan.getUserId()).isEqualTo(DEFAULT_USER_ID);

        // Validate the YearlyPlan in Elasticsearch
        YearlyPlan yearlyPlanEs = yearlyPlanSearchRepository.findOne(testYearlyPlan.getId());
        assertThat(yearlyPlanEs).isEqualToIgnoringGivenFields(testYearlyPlan);
    }

    @Test
    public void createYearlyPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yearlyPlanRepository.findAll().size();

        // Create the YearlyPlan with an existing ID
        yearlyPlan.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restYearlyPlanMockMvc.perform(post("/api/yearly-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearlyPlan)))
            .andExpect(status().isBadRequest());

        // Validate the YearlyPlan in the database
        List<YearlyPlan> yearlyPlanList = yearlyPlanRepository.findAll();
        assertThat(yearlyPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllYearlyPlans() throws Exception {
        // Initialize the database
        yearlyPlanRepository.save(yearlyPlan);

        // Get all the yearlyPlanList
        restYearlyPlanMockMvc.perform(get("/api/yearly-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yearlyPlan.getId())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].plan").value(hasItem(DEFAULT_PLAN.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())));
    }

    @Test
    public void getYearlyPlan() throws Exception {
        // Initialize the database
        yearlyPlanRepository.save(yearlyPlan);

        // Get the yearlyPlan
        restYearlyPlanMockMvc.perform(get("/api/yearly-plans/{id}", yearlyPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yearlyPlan.getId()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.plan").value(DEFAULT_PLAN.toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()));
    }

    @Test
    public void getNonExistingYearlyPlan() throws Exception {
        // Get the yearlyPlan
        restYearlyPlanMockMvc.perform(get("/api/yearly-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateYearlyPlan() throws Exception {
        // Initialize the database
        yearlyPlanService.save(yearlyPlan);

        int databaseSizeBeforeUpdate = yearlyPlanRepository.findAll().size();

        // Update the yearlyPlan
        YearlyPlan updatedYearlyPlan = yearlyPlanRepository.findOne(yearlyPlan.getId());
        updatedYearlyPlan
            .year(UPDATED_YEAR)
            .plan(UPDATED_PLAN)
            .userId(UPDATED_USER_ID);

        restYearlyPlanMockMvc.perform(put("/api/yearly-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYearlyPlan)))
            .andExpect(status().isOk());

        // Validate the YearlyPlan in the database
        List<YearlyPlan> yearlyPlanList = yearlyPlanRepository.findAll();
        assertThat(yearlyPlanList).hasSize(databaseSizeBeforeUpdate);
        YearlyPlan testYearlyPlan = yearlyPlanList.get(yearlyPlanList.size() - 1);
        assertThat(testYearlyPlan.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testYearlyPlan.getPlan()).isEqualTo(UPDATED_PLAN);
        assertThat(testYearlyPlan.getUserId()).isEqualTo(UPDATED_USER_ID);

        // Validate the YearlyPlan in Elasticsearch
        YearlyPlan yearlyPlanEs = yearlyPlanSearchRepository.findOne(testYearlyPlan.getId());
        assertThat(yearlyPlanEs).isEqualToIgnoringGivenFields(testYearlyPlan);
    }

    @Test
    public void updateNonExistingYearlyPlan() throws Exception {
        int databaseSizeBeforeUpdate = yearlyPlanRepository.findAll().size();

        // Create the YearlyPlan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restYearlyPlanMockMvc.perform(put("/api/yearly-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearlyPlan)))
            .andExpect(status().isCreated());

        // Validate the YearlyPlan in the database
        List<YearlyPlan> yearlyPlanList = yearlyPlanRepository.findAll();
        assertThat(yearlyPlanList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteYearlyPlan() throws Exception {
        // Initialize the database
        yearlyPlanService.save(yearlyPlan);

        int databaseSizeBeforeDelete = yearlyPlanRepository.findAll().size();

        // Get the yearlyPlan
        restYearlyPlanMockMvc.perform(delete("/api/yearly-plans/{id}", yearlyPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean yearlyPlanExistsInEs = yearlyPlanSearchRepository.exists(yearlyPlan.getId());
        assertThat(yearlyPlanExistsInEs).isFalse();

        // Validate the database is empty
        List<YearlyPlan> yearlyPlanList = yearlyPlanRepository.findAll();
        assertThat(yearlyPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void searchYearlyPlan() throws Exception {
        // Initialize the database
        yearlyPlanService.save(yearlyPlan);

        // Search the yearlyPlan
        restYearlyPlanMockMvc.perform(get("/api/_search/yearly-plans?query=id:" + yearlyPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yearlyPlan.getId())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].plan").value(hasItem(DEFAULT_PLAN.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YearlyPlan.class);
        YearlyPlan yearlyPlan1 = new YearlyPlan();
        yearlyPlan1.setId("id1");
        YearlyPlan yearlyPlan2 = new YearlyPlan();
        yearlyPlan2.setId(yearlyPlan1.getId());
        assertThat(yearlyPlan1).isEqualTo(yearlyPlan2);
        yearlyPlan2.setId("id2");
        assertThat(yearlyPlan1).isNotEqualTo(yearlyPlan2);
        yearlyPlan1.setId(null);
        assertThat(yearlyPlan1).isNotEqualTo(yearlyPlan2);
    }
}
