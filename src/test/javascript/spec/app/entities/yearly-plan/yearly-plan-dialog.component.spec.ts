/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {JhiEventManager} from 'ng-jhipster';

import {PersonalNotebookTestModule} from '../../../test.module';
import {YearlyPlanDialogComponent} from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan-dialog.component';
import {YearlyPlanService} from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.service';
import {YearlyPlan} from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.model';

describe('Component Tests', () => {

    describe('YearlyPlan Management Dialog Component', () => {
        let comp: YearlyPlanDialogComponent;
        let fixture: ComponentFixture<YearlyPlanDialogComponent>;
        let service: YearlyPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [YearlyPlanDialogComponent],
                providers: [
                    YearlyPlanService
                ]
            })
            .overrideTemplate(YearlyPlanDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearlyPlanDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearlyPlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new YearlyPlan('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.yearlyPlan = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'yearlyPlanListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new YearlyPlan();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.yearlyPlan = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'yearlyPlanListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
