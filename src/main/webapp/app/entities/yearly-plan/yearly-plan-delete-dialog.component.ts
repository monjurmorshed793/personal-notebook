import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {YearlyPlan} from './yearly-plan.model';
import {YearlyPlanPopupService} from './yearly-plan-popup.service';
import {YearlyPlanService} from './yearly-plan.service';

@Component({
    selector: 'jhi-yearly-plan-delete-dialog',
    templateUrl: './yearly-plan-delete-dialog.component.html'
})
export class YearlyPlanDeleteDialogComponent {

    yearlyPlan: YearlyPlan;

    constructor(
        private yearlyPlanService: YearlyPlanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.yearlyPlanService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'yearlyPlanListModification',
                content: 'Deleted an yearlyPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yearly-plan-delete-popup',
    template: ''
})
export class YearlyPlanDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yearlyPlanPopupService: YearlyPlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.yearlyPlanPopupService
                .open(YearlyPlanDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
