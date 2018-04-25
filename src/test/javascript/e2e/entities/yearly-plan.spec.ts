import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('YearlyPlan e2e test', () => {

    let navBarPage: NavBarPage;
    let yearlyPlanDialogPage: YearlyPlanDialogPage;
    let yearlyPlanComponentsPage: YearlyPlanComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load YearlyPlans', () => {
        navBarPage.goToEntity('yearly-plan');
        yearlyPlanComponentsPage = new YearlyPlanComponentsPage();
        expect(yearlyPlanComponentsPage.getTitle())
            .toMatch(/Yearly Plans/);

    });

    it('should load create YearlyPlan dialog', () => {
        yearlyPlanComponentsPage.clickOnCreateButton();
        yearlyPlanDialogPage = new YearlyPlanDialogPage();
        expect(yearlyPlanDialogPage.getModalTitle())
            .toMatch(/Create or edit a Yearly Plan/);
        yearlyPlanDialogPage.close();
    });

    it('should create and save YearlyPlans', () => {
        yearlyPlanComponentsPage.clickOnCreateButton();
        yearlyPlanDialogPage.setYearInput('5');
        expect(yearlyPlanDialogPage.getYearInput()).toMatch('5');
        yearlyPlanDialogPage.setPlanInput('plan');
        expect(yearlyPlanDialogPage.getPlanInput()).toMatch('plan');
        yearlyPlanDialogPage.setUserIdInput('userId');
        expect(yearlyPlanDialogPage.getUserIdInput()).toMatch('userId');
        yearlyPlanDialogPage.save();
        expect(yearlyPlanDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class YearlyPlanComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-yearly-plan div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class YearlyPlanDialogPage {
    modalTitle = element(by.css('h4#myYearlyPlanLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    yearInput = element(by.css('input#field_year'));
    planInput = element(by.css('input#field_plan'));
    userIdInput = element(by.css('input#field_userId'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setYearInput = function(year) {
        this.yearInput.sendKeys(year);
    };

    getYearInput = function() {
        return this.yearInput.getAttribute('value');
    };

    setPlanInput = function(plan) {
        this.planInput.sendKeys(plan);
    };

    getPlanInput = function() {
        return this.planInput.getAttribute('value');
    };

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
