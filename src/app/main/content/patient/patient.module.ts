import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';

const routes = [	
    {path     : 'add-patient', component: AddPatientComponent},
    {path     : 'edit-patient/:id', component: EditPatientComponent},
    {path     : 'list-patients', component: ListPatientComponent},
];

@NgModule({
    declarations: [
        AddPatientComponent,
        ListPatientComponent,
        EditPatientComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        AddPatientComponent
    ]
})

export class PatientModule {
	
}