package org.notebook.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.notebook.domain.YearlyPlan;
import org.notebook.service.YearlyPlanService;
import org.notebook.web.rest.errors.BadRequestAlertException;
import org.notebook.web.rest.util.HeaderUtil;
import org.notebook.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing YearlyPlan.
 */
@RestController
@RequestMapping("/api")
public class YearlyPlanResource {

    private final Logger log = LoggerFactory.getLogger(YearlyPlanResource.class);

    private static final String ENTITY_NAME = "yearlyPlan";

    private final YearlyPlanService yearlyPlanService;

    public YearlyPlanResource(YearlyPlanService yearlyPlanService) {
        this.yearlyPlanService = yearlyPlanService;
    }

    /**
     * POST  /yearly-plans : Create a new yearlyPlan.
     *
     * @param yearlyPlan the yearlyPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yearlyPlan, or with status 400 (Bad Request) if the yearlyPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yearly-plans")
    @Timed
    public ResponseEntity<YearlyPlan> createYearlyPlan(@RequestBody YearlyPlan yearlyPlan) throws URISyntaxException {
        log.debug("REST request to save YearlyPlan : {}", yearlyPlan);
        if (yearlyPlan.getId() != null) {
            throw new BadRequestAlertException("A new yearlyPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YearlyPlan result = yearlyPlanService.save(yearlyPlan);
        return ResponseEntity.created(new URI("/api/yearly-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yearly-plans : Updates an existing yearlyPlan.
     *
     * @param yearlyPlan the yearlyPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yearlyPlan,
     * or with status 400 (Bad Request) if the yearlyPlan is not valid,
     * or with status 500 (Internal Server Error) if the yearlyPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yearly-plans")
    @Timed
    public ResponseEntity<YearlyPlan> updateYearlyPlan(@RequestBody YearlyPlan yearlyPlan) throws URISyntaxException {
        log.debug("REST request to update YearlyPlan : {}", yearlyPlan);
        if (yearlyPlan.getId() == null) {
            return createYearlyPlan(yearlyPlan);
        }
        YearlyPlan result = yearlyPlanService.save(yearlyPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yearlyPlan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yearly-plans : get all the yearlyPlans.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of yearlyPlans in body
     */
    @GetMapping("/yearly-plans")
    @Timed
    public ResponseEntity<List<YearlyPlan>> getAllYearlyPlans(Pageable pageable) {
        log.debug("REST request to get a page of YearlyPlans");
        Page<YearlyPlan> page = yearlyPlanService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/yearly-plans");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /yearly-plans/:id : get the "id" yearlyPlan.
     *
     * @param id the id of the yearlyPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yearlyPlan, or with status 404 (Not Found)
     */
    @GetMapping("/yearly-plans/{id}")
    @Timed
    public ResponseEntity<YearlyPlan> getYearlyPlan(@PathVariable String id) {
        log.debug("REST request to get YearlyPlan : {}", id);
        YearlyPlan yearlyPlan = yearlyPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(yearlyPlan));
    }

    /**
     * DELETE  /yearly-plans/:id : delete the "id" yearlyPlan.
     *
     * @param id the id of the yearlyPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yearly-plans/{id}")
    @Timed
    public ResponseEntity<Void> deleteYearlyPlan(@PathVariable String id) {
        log.debug("REST request to delete YearlyPlan : {}", id);
        yearlyPlanService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/yearly-plans?query=:query : search for the yearlyPlan corresponding
     * to the query.
     *
     * @param query the query of the yearlyPlan search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/yearly-plans")
    @Timed
    public ResponseEntity<List<YearlyPlan>> searchYearlyPlans(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of YearlyPlans for query {}", query);
        Page<YearlyPlan> page = yearlyPlanService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/yearly-plans");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
