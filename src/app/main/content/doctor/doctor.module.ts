import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

const routes = [	
    {path     : 'add-doctor', component: AddDoctorComponent},
    {path     : 'list-doctors', component: ListDoctorComponent},
    {path     : 'edit-doctors/:id', component: EditDoctorComponent}
];

@NgModule({
    declarations: [
        AddDoctorComponent,
        ListDoctorComponent,
        EditDoctorComponent
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