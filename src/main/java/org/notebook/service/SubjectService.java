package org.notebook.service;

import org.notebook.domain.Subject;
import org.notebook.domain.User;
import org.notebook.repository.SubjectRepository;
import org.notebook.repository.search.SubjectSearchRepository;
import org.notebook.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Subject.
 */
@Service
public class SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectService.class);

    private final SubjectRepository subjectRepository;

    private final SubjectSearchRepository subjectSearchRepository;

    private final UserService userService;

    public SubjectService(SubjectRepository subjectRepository, SubjectSearchRepository subjectSearchRepository, UserService userService) {
        this.subjectRepository = subjectRepository;
        this.subjectSearchRepository = subjectSearchRepository;
        this.userService = userService;
    }

    /**
     * Save a subject.
     *
     * @param subject the entity to save
     * @return the persisted entity
     */
    public Subject save(Subject subject) {
        String loggedUserLogin = SecurityUtils.getCurrentUserLogin().get();
        log.debug("Request to save Subject : {} for user {}", subject, loggedUserLogin);
        User loggedUser = userService.getUserByLogin(loggedUserLogin).get();
        subject.setUserId(loggedUser.getId());
        Subject result = subjectRepository.save(subject);
        subjectSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the subjects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<Subject> findAll(Pageable pageable) {
        log.debug("Request to get all Subjects");
        return subjectRepository.findAll(pageable);
    }

    /**
     * Get all the subjects by user.
     *
     * @return the list of entities
     */
    public Page<Subject> findAllByLoggedUser(Pageable pageable){
        String loggedUserLogin = SecurityUtils.getCurrentUserLogin().get();
        log.debug("Request to get all  Subjects according to userId: {}"+ loggedUserLogin);
        User loggedUser = userService.getUserByLogin(loggedUserLogin).get();
        return subjectRepository.findAllByUserId(pageable, loggedUser.getId());
    }

    /**
     * Get one subject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Subject findOne(String id) {
        log.debug("Request to get Subject : {}", id);
        return subjectRepository.findOne(id);
    }

    /**
     * Delete the subject by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Subject : {}", id);
        subjectRepository.delete(id);
        subjectSearchRepository.delete(id);
    }

    /**
     * Search for the subject corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<Subject> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Subjects for query {}", query);
        String loggedUserLogin = SecurityUtils.getCurrentUserLogin().get();
        User loggedUser = userService.getUserByLogin(loggedUserLogin).get();
//        Page<Subject> result = subjectSearchRepository.search(queryStringQuery(query+" "+loggedUser.getLogin()), pageable);
        Page<Subject> result = subjectSearchRepository.findAllByNameAndUserId(query, loggedUser.getId(), pageable);
        return result;

    }
}
