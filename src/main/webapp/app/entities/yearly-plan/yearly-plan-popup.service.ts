import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { YearlyPlan } from './yearly-plan.model';
import { YearlyPlanService } from './yearly-plan.service';

@Injectable()
export class YearlyPlanPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private yearlyPlanService: YearlyPlanService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.yearlyPlanService.find(id)
                    .subscribe((yearlyPlanResponse: HttpResponse<YearlyPlan>) => {
                        const yearlyPlan: YearlyPlan = yearlyPlanResponse.body;
                        this.ngbModalRef = this.yearlyPlanModalRef(component, yearlyPlan);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.yearlyPlanModalRef(component, new YearlyPlan());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    yearlyPlanModalRef(component: Component, yearlyPlan: YearlyPlan): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.yearlyPlan = yearlyPlan;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
