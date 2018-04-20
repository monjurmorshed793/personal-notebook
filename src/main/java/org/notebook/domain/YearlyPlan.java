package org.notebook.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Objects;

/**
 * A YearlyPlan.
 */
@Document(collection = "yearly_plan")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "yearlyplan")
public class YearlyPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("year")
    private Integer year;

    @Field("plan")
    private String plan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public YearlyPlan year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getPlan() {
        return plan;
    }

    public YearlyPlan plan(String plan) {
        this.plan = plan;
        return this;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        YearlyPlan yearlyPlan = (YearlyPlan) o;
        if (yearlyPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), yearlyPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "YearlyPlan{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", plan='" + getPlan() + "'" +
            "}";
    }
}
