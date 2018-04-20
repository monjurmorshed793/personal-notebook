package org.notebook.repository;

import org.notebook.domain.YearlyPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the YearlyPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YearlyPlanRepository extends MongoRepository<YearlyPlan, String> {

}
