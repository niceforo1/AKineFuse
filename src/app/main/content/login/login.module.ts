import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseLoginComponent } from './login.component';

const routes = [
  {
    path: 'login',
    component: FuseLoginComponent
  }
];

@NgModule({
  declarations: [FuseLoginComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [FuseLoginComponent]
})
export class LoginModule {}
