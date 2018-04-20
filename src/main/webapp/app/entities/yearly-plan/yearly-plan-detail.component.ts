import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {YearlyPlan} from './yearly-plan.model';
import {YearlyPlanService} from './yearly-plan.service';

@Component({
    selector: 'jhi-yearly-plan-detail',
    templateUrl: './yearly-plan-detail.component.html'
})
export class YearlyPlanDetailComponent implements OnInit, OnDestroy {

    yearlyPlan: YearlyPlan;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private yearlyPlanService: YearlyPlanService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInYearlyPlans();
    }

    load(id) {
        this.yearlyPlanService.find(id)
            .subscribe((yearlyPlanResponse: HttpResponse<YearlyPlan>) => {
                this.yearlyPlan = yearlyPlanResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInYearlyPlans() {
        this.eventSubscriber = this.eventManager.subscribe(
            'yearlyPlanListModification',
            (response) => this.load(this.yearlyPlan.id)
        );
    }
}
