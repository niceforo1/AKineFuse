import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

/* Services */
import { ProfessionalService } from '../../../services/professional.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls  : ['list-doctor.css'],
  providers: [
    ProfessionalService
  ]
})
export class ListDoctorComponent implements OnInit {
  message : string;
  messageClass : string;
  professional : any;
  professionals: any;
  displayedColumns = ['name','lastName','birthDate', 'gender', 'action'];
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _professionalService: ProfessionalService, private router: Router) {
  }

  ngOnInit() {
        this.professionals = this.getProfessionals();
  }

  getProfessionals() {
    this._professionalService.getProfessional().subscribe( response  => {
      this.professionals = response;
      this.dataSource = new MatTableDataSource(this.professionals.map(dato => {return Object.assign(dato, {'action':'action'})}));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err => {
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = `${err.error}`
      console.log(`${err.error}`)
    });
  }

  deleteProfessional(doctor, i){
    //console.log(i, doctor)
    let result = confirm("¡Esta seguro que desea borrar el Licenciado seleccionado?");
    if(result) {
      this._professionalService.deleteProfessional(doctor._id).subscribe(response => {
        this.getProfessionals();
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

  /*asClick(doctor, i){
    //this.professionals.splice(0, 1);
    console.log(doctor, i);
    this.dataSource.data.splice(i,1);
    this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
    console.log(this.dataSource.data)
  }*/
}
