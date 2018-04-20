package org.notebook.repository.search;

import org.notebook.domain.YearlyPlan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the YearlyPlan entity.
 */
public interface YearlyPlanSearchRepository extends ElasticsearchRepository<YearlyPlan, String> {
}
