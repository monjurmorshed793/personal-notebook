package org.notebook.repository;

import org.notebook.domain.YearlyPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Stream;

/**
 * Spring Data MongoDB repository for the YearlyPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YearlyPlanRepository extends MongoRepository<YearlyPlan, String> {

}
