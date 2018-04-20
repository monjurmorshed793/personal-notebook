/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {JhiEventManager} from 'ng-jhipster';

import {PersonalNotebookTestModule} from '../../../test.module';
import {YearlyPlanDeleteDialogComponent} from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan-delete-dialog.component';
import {YearlyPlanService} from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.service';

describe('Component Tests', () => {

    describe('YearlyPlan Management Delete Component', () => {
        let comp: YearlyPlanDeleteDialogComponent;
        let fixture: ComponentFixture<YearlyPlanDeleteDialogComponent>;
        let service: YearlyPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [YearlyPlanDeleteDialogComponent],
                providers: [
                    YearlyPlanService
                ]
            })
            .overrideTemplate(YearlyPlanDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearlyPlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearlyPlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
