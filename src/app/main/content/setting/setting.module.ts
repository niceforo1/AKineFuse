import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AddSocialInsuranceComponent } from './add-social-insurance/add-social-insurance.component';
import { EditSocialInsuranceComponent } from './edit-social-insurance/edit-social-insurance.component';
import { ListSocialInsuranceComponent } from './list-social-insurance/list-social-insurance.component';


const routes = [
    {path     : 'add-social-insurance', component: AddSocialInsuranceComponent},
    {path     : 'edit-social-insurance/:id', component: EditSocialInsuranceComponent},
    {path     : 'list-social-insurances', component: ListSocialInsuranceComponent},
];

@NgModule({
    declarations: [
      AddSocialInsuranceComponent,
      ListSocialInsuranceComponent,
      EditSocialInsuranceComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      AddSocialInsuranceComponent
    ]
})

export class SettingModule {

}
