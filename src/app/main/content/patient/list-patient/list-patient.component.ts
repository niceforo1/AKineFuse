import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
/* Services */
import {PatientService} from '../../../services/patient.service';
/*Dialog*/
import { DialogConfigComponent }from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls  : ['list-patient.css'],
  providers: [
    PatientService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class ListPatientComponent implements OnInit {
  patient: any;
  patients: any;
  displayedColumns = ['name', 'contact','socialInsurance', 'action'];
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _patientService: PatientService, private router: Router, private dialog: DialogConfigComponent,
              public alert: AlertComponent) {
    this.patients = this.getPatients();
  }

  ngOnInit() {
  }

  getPatients() {
    this._patientService.getPatient().subscribe(response => {
      this.patients = response;
      this.dataSource = new MatTableDataSource(this.patients.map(dato => {return Object.assign(dato, {'action':'action'})}));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

  deletePatient(patient, i){
    let dialogRef = this.dialog.openConfirmDialog(this.dialog.dialogConfirmBorrar);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this._patientService.deletePatient(patient._id).subscribe(response => {
          this.getPatients();
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
