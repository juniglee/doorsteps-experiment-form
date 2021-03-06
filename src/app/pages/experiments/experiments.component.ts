import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../component/confirmation-modal/confirmation-modal.component';
import { Form } from '../../model/form.model';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html'
})
export class ExperimentsComponent {
    experiments: Form[] = [];

    constructor(private formService: FormService, private modalService: NgbModal) {

    }

    ngOnInit() {
        this._loadData();
    }

    addNewExperiment() {
        let newExperiment: Form = new Form({
            Name: "New Experiment",
            Url: "new-experiment",
            IsActive: true,
            Questions: []
        });

        this._addNewMandatoryLines(newExperiment);

        this.experiments.push(newExperiment);
    }

    deleteExperiment(experiment: Form, index: number) {
        var confirmationModal = this.modalService.open(ConfirmationModalComponent, { size: 'md' });

        confirmationModal.result.then(() => {
            if (experiment.Id) {
                //API call to delete
                this.formService.delete(experiment.Id).subscribe(() => {
                    this.experiments.splice(index, 1);
                });
            }
            else {
                this.experiments.splice(index, 1);
            }
        });
    }

    addNewLine(experiment: Form) {
        experiment.Questions.push({
            QuestionName: '',
            QuestionControlName: '',
            QuestionType: '',
            Options: []
        });
    }

    removeLine(experiment: Form, index: number) {
        experiment.Questions.splice(index, 1);
    }

    checkSelect(question: any) {
        if (question.QuestionType == "select") {
            console.log('selected');
            if (question.Options.length == 0) {
                question.Options.push({
                    Key: '',
                    Value: 0
                });
            }
        }
    }

    addNewOption(options: any) {
        options.push({
            Key: '',
            Value: 0
        });
    }

    removeOption(question: any, index: number) {
        question.Options.splice(index, 1);
    }

    prefillUrl(experiment: Form) {
        experiment.Url = experiment.Name?.replace(/\s+/g, '-').replace('?', "").toLowerCase();
    }

    prefillControlName(question: any) {
        question.QuestionControlName = question.QuestionName?.replace(/\s+/g, '-').replace('?', "").toLowerCase();
    }

    onSubmit() {
        this.formService.post(this.experiments).subscribe(() => {
            this._loadData();
        });
    }

    _loadData() {
        this.experiments = [];
        this.formService.getExperiments().subscribe((results: any) => {
            results.forEach((result: any) => {
                this.experiments.push(new Form(result));
            });
        });
    }

    _addNewMandatoryLines(experiment: Form) {
        experiment.Questions.push({
            QuestionName: 'Name',
            QuestionControlName: 'name',
            QuestionType: 'single',
            Options: []
        });
        experiment.Questions.push({
            QuestionName: 'Email',
            QuestionControlName: 'email',
            QuestionType: 'email',
            Options: []
        });
        experiment.Questions.push({
            QuestionName: 'Phone',
            QuestionControlName: 'phone',
            QuestionType: 'phone',
            Options: []
        });
    }

    _getCollapseId(experiment: Form) {
        return "collapse_" + experiment.Url;
    }
}