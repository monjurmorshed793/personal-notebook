package org.notebook.cucumber.stepdefs;

import org.notebook.PersonalNotebookApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = PersonalNotebookApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
