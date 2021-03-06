import { Component } from '@angular/core';
import { Form } from '../../model/form.model';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    experiments: Form[] = [];

    constructor(private formService: FormService) {

    }

    ngOnInit() {
        this.formService.getExperiments().subscribe((results: any) => {
            results.forEach((result: any) => {
                if (result.IsActive) {
                    this.experiments.push(new Form(result));
                }
            });
        });
    }

}