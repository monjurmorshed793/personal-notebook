package org.notebook.repository;

import org.notebook.domain.YearlyPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the YearlyPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YearlyPlanRepository extends MongoRepository<YearlyPlan, String> {
    Page<YearlyPlan> findAllByUserId(Pageable pageable, String userId);
}
