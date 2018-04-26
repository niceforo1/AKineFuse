import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { DialogComponentSocIns } from './dialog-add-SocIns.component';
import { DialogConfigSocInsComponent } from './dialogConfig-add-SocIns.component';

const routes = [];

@NgModule({
    declarations: [ DialogComponentSocIns ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    entryComponents: [ DialogComponentSocIns]
})
export class DialogSocInsModule {}
