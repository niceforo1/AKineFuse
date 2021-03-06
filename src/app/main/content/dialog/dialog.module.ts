import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { DialogComponent } from './dialog.component';
import { DialogConfigComponent } from './dialogConfig.component';

const routes = [];

@NgModule({
    declarations: [DialogComponent, DialogConfigComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    entryComponents: [DialogComponent]
})
export class DialogModule {}
