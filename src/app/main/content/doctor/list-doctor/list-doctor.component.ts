import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

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

  constructor(private _professionalService: ProfessionalService, private router: Router) {
  }

  ngOnInit() {
        this.professionals = this.getProfessionals();
  }

  getProfessionals() {
    this._professionalService.getProfessional().subscribe( response  => {
      this.professionals = response;
      //this.dataSource = new MatTableDataSource(this.professionals.map(dato => {return  {...{dato}, action:'asd'}}));
      this.dataSource = new MatTableDataSource(this.professionals.map(dato => {return Object.assign(dato, {'action':'puto'})}));
    },
    err => {
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = `${err.error}`
      console.log(`${err.error}`)
    });
  }

  deleteProfessional(id){
    let result = confirm("¡Esta seguro que desea borrar el Licenciado seleccionado?");
    if(result) {
      this._professionalService.deleteProfessional(id).subscribe(response => {
        this.professionals.splice(this.professionals.indexOf(response), 1);
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

  asClick(doctor, i){
    //this.professionals.splice(0, 1);
    console.log(doctor, i);
    this.dataSource.data.splice(i,1);
    this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);    
    console.log(this.dataSource.data)
  }
}
