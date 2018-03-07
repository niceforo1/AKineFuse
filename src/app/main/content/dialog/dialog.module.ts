import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { DialogComponent } from './dialog.component';

const routes = [

];

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    entryComponents     : [
        DialogComponent
    ]
})

export class DialogModule {

}
