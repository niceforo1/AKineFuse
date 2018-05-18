import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
/* Services */
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-list-social-insurance',
  templateUrl: './list-social-insurance.component.html',
  styleUrls  : ['list-social-insurance.css'],
  providers: [
    SocialInsuranceService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class ListSocialInsuranceComponent implements OnInit {
  socialInsurance: any;
  socialInsurances: any;
  displayedColumns = ['name', 'responsibleContact', 'contact', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _socialInsuranceService: SocialInsuranceService,
              private router: Router,
              private dialog: DialogConfigComponent,
              public alert: AlertComponent) {
    this.socialInsurances = this.getSocialInsurances();
  }

  ngOnInit() {
  }

  getSocialInsurances() {
    this._socialInsuranceService.getSocialInsurance().subscribe(response => {
      this.socialInsurances = response;
      this.dataSource = new MatTableDataSource(this.socialInsurances.map(dato => {return Object.assign(dato, {'action': 'action'});}));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

  deleteSocialInsurance(socialInsurance, i){
    let dialogRef = this.dialog.openConfirmDialog(this.dialog.dialogConfirmBorrar);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this._socialInsuranceService.deleteSocialInsurance(socialInsurance._id).subscribe(response => {
          this.getSocialInsurances();
          if(!this.paginator.hasNextPage()){
            let num = Math.trunc(this.paginator.length / this.paginator.pageSize);
            if(num > 0){
              this.paginator.pageIndex = num - 1;
            } else if(num = 0){
              this.paginator.pageIndex = num;
            }
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.alert.openSuccessSnackBar(this.alert.genericDeleteOk);
        },
        err => {
          this.alert.openErrorSnackBar(this.alert.genericError);
        });
      }
    });
  }

  applyFilter(filterValue: string){
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }
}
