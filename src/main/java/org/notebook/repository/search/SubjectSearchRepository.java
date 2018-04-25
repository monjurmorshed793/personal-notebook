package org.notebook.repository.search;

import org.notebook.domain.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * Spring Data Elasticsearch repository for the Subject entity.
 */
public interface SubjectSearchRepository extends ElasticsearchRepository<Subject, String> {
    Page<Subject> findAllByNameAndUserId(String name, String userId, Pageable pageable);
}
