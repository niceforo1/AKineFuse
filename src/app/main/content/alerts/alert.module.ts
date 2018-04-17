import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { AlertComponent } from './alert.component';

const routes = [];

@NgModule({
    declarations: [AlertComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    entryComponents: [AlertComponent]
})
export class AlertModule {}
