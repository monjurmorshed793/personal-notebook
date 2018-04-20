package org.notebook.service;

import org.notebook.domain.Subject;
import org.notebook.repository.SubjectRepository;
import org.notebook.repository.search.SubjectSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing Subject.
 */
@Service
public class SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectService.class);

    private final SubjectRepository subjectRepository;

    private final SubjectSearchRepository subjectSearchRepository;

    public SubjectService(SubjectRepository subjectRepository, SubjectSearchRepository subjectSearchRepository) {
        this.subjectRepository = subjectRepository;
        this.subjectSearchRepository = subjectSearchRepository;
    }

    /**
     * Save a subject.
     *
     * @param subject the entity to save
     * @return the persisted entity
     */
    public Subject save(Subject subject) {
        log.debug("Request to save Subject : {}", subject);
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
        Page<Subject> result = subjectSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
