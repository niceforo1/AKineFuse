import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { fuseAnimations } from '../../../../core/animations';

@Component({
  selector: 'fuse-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FuseProjectComponent {
  data: any;
  widgets: any = {};
  widget1: any = {};
  widget2: any = {};

  constructor(private dashboardService: DashboardService) {
    this.data = this.dashboardService.widgetsData;
    /**
     * Widget 1
     */

    this.widgets.widget1 = {
      title: 'Total',
      data: {
        label: 'Licenciados',
        count: this.data.professionalCountTotal
      },
      data1: {
        label: 'Pacientes',
        count: this.data.patientCountTotal
      }
    };

    this.widgets.widget2 = {
      mainChart: {
        0: this.data.patientInsurances
      }
    };

    this.widget2 = {
      title: 'Pacientes por O.S.',
      showLegend: false,
      explodeSlices: false,
      labels: true,
      doughnut: true,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
      }
    };
  }
}
