import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseProjectComponent } from './project.component';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DashboardService } from '../../../services/dashboard.service';
import { FuseWidgetModule } from '../../../../core/components/widget/widget.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FuseProjectComponent,
    resolve: {
      data: DashboardService
    }
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    NgxChartsModule
  ],
  declarations: [FuseProjectComponent],
  providers: [DashboardService]
})
export class FuseProjectDashboardModule {}
