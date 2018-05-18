import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

/* Services */
import { ProfessionalService } from '../../../services/professional.service';

/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['list-doctor.css'],
  providers: [ProfessionalService, DialogConfigComponent, AlertComponent]
})
export class ListDoctorComponent implements OnInit {
  professional: any;
  professionals: any;
  displayedColumns = ['name', 'lastName', 'birthDate', 'gender', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _professionalService: ProfessionalService,
    private dialog: DialogConfigComponent,
    public alert: AlertComponent
  ) {}

  ngOnInit() {
    this.professionals = this.getProfessionals();
  }

  getProfessionals() {
    this._professionalService.getProfessional().subscribe(
      response => {
        this.professionals = response;
        this.dataSource = new MatTableDataSource(
          this.professionals.map(dato => {
            return Object.assign(dato, { action: 'action' });
          })
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      }
    );
  }

  deleteProfessional(doctor, i) {
    let dialogRef = this.dialog.openConfirmDialog(
      this.dialog.dialogConfirmBorrar
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._professionalService.deleteProfessional(doctor._id).subscribe(
          response => {
            this.getProfessionals();
            if (!this.paginator.hasNextPage()) {
              let num = Math.trunc(
                this.paginator.length / this.paginator.pageSize
              );
              if (num > 0) {
                this.paginator.pageIndex = num - 1;
              } else if ((num = 0)) {
                this.paginator.pageIndex = num;
              }
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.alert.openSuccessSnackBar(this.alert.genericDeleteOk);
          },
          err => {
            this.alert.openErrorSnackBar(this.alert.genericError);
          }
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
