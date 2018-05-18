import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddDoctorComponent2 } from './add-doctor-stepper/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

const routes = [
    {path     : 'add-doctor', component: AddDoctorComponent},
    {path     : 'add-doctor2', component: AddDoctorComponent2},
    {path     : 'list-doctors', component: ListDoctorComponent},
    {path     : 'edit-doctors/:id', component: EditDoctorComponent},
    {path     : 'calendar', loadChildren: './calendar/calendar.module#FuseCalendarModule' },
];

@NgModule({
    declarations: [
        AddDoctorComponent,
        AddDoctorComponent2,
        ListDoctorComponent,
        EditDoctorComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        AddDoctorComponent,
        AddDoctorComponent2
    ]
})

export class DoctorModule {

}
