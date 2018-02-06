import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';

const routes = [	
    {path     : 'add-doctor', component: AddDoctorComponent},
    {path     : 'list-doctors', component: ListDoctorComponent}
];

@NgModule({
    declarations: [
        AddDoctorComponent,
        ListDoctorComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        AddDoctorComponent
    ]
})

export class DoctorModule {
	
}