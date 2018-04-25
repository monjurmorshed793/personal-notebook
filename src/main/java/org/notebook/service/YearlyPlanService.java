package org.notebook.service;

import org.notebook.domain.User;
import org.notebook.domain.YearlyPlan;
import org.notebook.repository.UserRepository;
import org.notebook.repository.YearlyPlanRepository;
import org.notebook.repository.search.YearlyPlanSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing YearlyPlan.
 */
@Service
public class YearlyPlanService {

    private final Logger log = LoggerFactory.getLogger(YearlyPlanService.class);

    private final YearlyPlanRepository yearlyPlanRepository;

    private final YearlyPlanSearchRepository yearlyPlanSearchRepository;

    private final UserService userService;

    public YearlyPlanService(YearlyPlanRepository yearlyPlanRepository, YearlyPlanSearchRepository yearlyPlanSearchRepository, UserService userService) {
        this.yearlyPlanRepository = yearlyPlanRepository;
        this.yearlyPlanSearchRepository = yearlyPlanSearchRepository;
        this.userService = userService;
    }

    /**
     * Save a yearlyPlan.
     *
     * @param yearlyPlan the entity to save
     * @return the persisted entity
     */
    public YearlyPlan save(YearlyPlan yearlyPlan) {
        User loggedUser = userService.getLoggedUser().get();
        log.debug("Request to save YearlyPlan : {} for user : {}", yearlyPlan, loggedUser.getLogin());
        yearlyPlan.setUserId(loggedUser.getId());
        YearlyPlan result = yearlyPlanRepository.save(yearlyPlan);
        yearlyPlanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the yearlyPlans.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<YearlyPlan> findAll(Pageable pageable) {
        log.debug("Request to get all YearlyPlans");
        return yearlyPlanRepository.findAll(pageable);
    }

    /**
     * Get all the yearlyPlans according to logged user.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<YearlyPlan> findAllByLoggedUser(Pageable pageable){
        User loggedUser = userService.getLoggedUser().get();
        log.debug("Request to get all YearlyPlans by logged user: {}", loggedUser.getLogin());
        return yearlyPlanRepository.findAllByUserId(pageable, loggedUser.getId());
    }

    /**
     * Get one yearlyPlan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public YearlyPlan findOne(String id) {
        log.debug("Request to get YearlyPlan : {}", id);
        return yearlyPlanRepository.findOne(id);
    }

    /**
     * Delete the yearlyPlan by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete YearlyPlan : {}", id);
        yearlyPlanRepository.delete(id);
        yearlyPlanSearchRepository.delete(id);
    }

    /**
     * Search for the yearlyPlan corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<YearlyPlan> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of YearlyPlans for query {}", query);
        Page<YearlyPlan> result = yearlyPlanSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
