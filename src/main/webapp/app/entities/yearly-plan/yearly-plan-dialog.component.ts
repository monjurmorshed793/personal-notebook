import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {YearlyPlan} from './yearly-plan.model';
import {YearlyPlanPopupService} from './yearly-plan-popup.service';
import {YearlyPlanService} from './yearly-plan.service';

@Component({
    selector: 'jhi-yearly-plan-dialog',
    templateUrl: './yearly-plan-dialog.component.html'
})
export class YearlyPlanDialogComponent implements OnInit {

    yearlyPlan: YearlyPlan;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private yearlyPlanService: YearlyPlanService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        let currentDate = new Date();
        this.yearlyPlan.year = currentDate.getFullYear();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.yearlyPlan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.yearlyPlanService.update(this.yearlyPlan));
        } else {
            this.subscribeToSaveResponse(
                this.yearlyPlanService.create(this.yearlyPlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<YearlyPlan>>) {
        result.subscribe((res: HttpResponse<YearlyPlan>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: YearlyPlan) {
        this.eventManager.broadcast({ name: 'yearlyPlanListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-yearly-plan-popup',
    template: ''
})
export class YearlyPlanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yearlyPlanPopupService: YearlyPlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.yearlyPlanPopupService
                    .open(YearlyPlanDialogComponent as Component, params['id']);
            } else {
                this.yearlyPlanPopupService
                    .open(YearlyPlanDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
