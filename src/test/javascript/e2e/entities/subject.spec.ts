import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Subject e2e test', () => {

    let navBarPage: NavBarPage;
    let subjectDialogPage: SubjectDialogPage;
    let subjectComponentsPage: SubjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Subjects', () => {
        navBarPage.goToEntity('subject');
        subjectComponentsPage = new SubjectComponentsPage();
        expect(subjectComponentsPage.getTitle())
            .toMatch(/Subjects/);

    });

    it('should load create Subject dialog', () => {
        subjectComponentsPage.clickOnCreateButton();
        subjectDialogPage = new SubjectDialogPage();
        expect(subjectDialogPage.getModalTitle())
            .toMatch(/Create or edit a Subject/);
        subjectDialogPage.close();
    });

    it('should create and save Subjects', () => {
        subjectComponentsPage.clickOnCreateButton();
        subjectDialogPage.setNameInput('name');
        expect(subjectDialogPage.getNameInput()).toMatch('name');
        subjectDialogPage.setDescriptionInput('description');
        expect(subjectDialogPage.getDescriptionInput()).toMatch('description');
        subjectDialogPage.save();
        expect(subjectDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubjectComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-subject div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SubjectDialogPage {
    modalTitle = element(by.css('h4#mySubjectLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
