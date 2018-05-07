import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { ListSocialInsuranceComponent } from './list-social-insurance/list-social-insurance.component';

const routes = [
    {path     : 'list-social-insurances', component: ListSocialInsuranceComponent},
];

@NgModule({
    declarations: [
      ListSocialInsuranceComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      ]
})

export class SettingModule {

}
