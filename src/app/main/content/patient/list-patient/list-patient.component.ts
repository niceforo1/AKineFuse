import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource } from '@angular/material';
/* Services */
import {PatientService} from '../../../services/patient.service';


@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls  : ['list-patient.css'],
  providers: [
    PatientService
  ]
})
export class ListPatientComponent implements OnInit {
  message : string;
  messageClass : string;
  patient: any;
  patients: any;
  displayedColumns = ['name', 'contact','socialInsurance', 'action'];
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _patientService: PatientService, private router: Router) {
    this.patients = this.getPatients();
  }

  ngOnInit() {
  }

  getPatients() {
    this._patientService.getPatient().subscribe(response => {
      this.patients = response;
      this.dataSource = new MatTableDataSource(this.patients.map(dato => {return Object.assign(dato, {'action':'action'})}));
      this.dataSource.paginator = this.paginator;
    },
    err => {
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = `${err.error}`
      console.log(`${err.error}`)
    });
  }

  deletePatient(patient, i){
    let result = confirm("¡Esta seguro que desea borrar el Paciente seleccionado?");
    if(result) {
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
      },
      err => {
        this.messageClass = 'alert alert-danger alert-dismissible';
        this.message = `${err.error}`
        console.log(`${err.error}`)
      });
    }
  }

  applyFilter(filterValue: string){
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }
}
