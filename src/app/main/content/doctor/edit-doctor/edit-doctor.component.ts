import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/* Services */
import { ProfessionalService } from '../../../services/professional.service';
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
import { LocationService } from '../../../services/location.service';
/* Models */
import { Professional } from '../../../models/Professional';
import {Address} from '../../../models/Address';
import {Phone} from '../../../models/Phone';
import {SocialInsurance} from '../../../models/SocialInsurance';
/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';
/*Autocomplete*/
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: '../add-doctor/add-doctor.component.html',
  providers: [
    ProfessionalService,
    SocialInsuranceService,
    LocationService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class EditDoctorComponent implements OnInit {
  action : string;
  title: string;
  professional : any;
  socialInsurances: any;
  socialInsurance: SocialInsurance;
  id_doctor : string;
  provinces: any;
  cities: any;

  myControlProv = new FormControl();
  myControlCity = new FormControl();
  myControlSIns = new FormControl();
  filteredOptionsProv: Observable<any[]>;
  filteredOptionsSIns: Observable<any[]>;
  filteredOptionsCity: Observable<any[]>;

  constructor(private _professionalService: ProfessionalService,
              private _socialInsuranceService: SocialInsuranceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              public dialogConfig: DialogConfigComponent,
              public alert: AlertComponent,
              private _locationService: LocationService) {
    this.action = 'Editar';
    this.title = 'Editar Licenciado';
    /*PROFESSIONAL*/
    this.professional = new Professional();
    /*PHONE*/
    this.professional.phones = new Phone();
    /*ADDRESS*/
    this.professional.address = new Address();
    this.id_doctor = null;
    /*SOCIAL INSURANCE*/
    this.socialInsurance = new SocialInsurance();
    this.socialInsurances = new Array();
    /*Provincias*/
    this.provinces = new Array();

  }

  ngOnInit() {
    this.getProvinces();
    this.getSocialInsurances();
    this.getProfessional();
  }

  onSubmit() {
    if (this.professional.address.state){
      if (!this.checkProvSelection(this.professional.address.state)){
        return;
      }
    }
    if (this.professional.address.city){
      if (!this.checkCitySelection(this.professional.address.city)){
        return;
      }
    }
    if (this.socialInsurance){
      if (!this.checkSocInsSelection(this.socialInsurance.name)){
        return;
      }
    }
    this.saveProfessional();
  }

  onChange() {
    if (!this.professional.address.state) {
      return;
    }
    this.getCities();
  }

  saveProfessional() {
    this._professionalService.updateProfessional(this.professional, this.professional._id).subscribe(data => {
      this.alert.openSuccessSnackBar(this.alert.successProfessional);
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      });
  }

  getProfessional(){
    this._activatedRoute.params.forEach((params:Params)=>{
    this.id_doctor = params['id'];
    this._professionalService.searchProfessional(this.id_doctor).subscribe(response => {
        this.professional = response;
        this.getCities();
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      });
  });
  }

  getSocialInsurances() {
    this._socialInsuranceService.getSocialInsurance().subscribe(
      response => {
        this.socialInsurances = response;
        this.filteredOptionsSIns = this.myControlSIns.valueChanges
          .startWith(null)
          .map(
            sIns => (sIns ? this.filterSIns(sIns) : this.socialInsurances.slice())
          );
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      }
    );
  }

  getProvinces() {
    this._locationService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        this.filteredOptionsProv = this.myControlProv.valueChanges
          .startWith(null)
          .map(
            prov => (prov ? this.filterProvinces(prov) : this.provinces.slice())
          );
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      }
    );
  }

  getCities() {
    this._locationService.getCities(this.professional.address.state).subscribe(
      data => {
        if (data[0] === undefined) {
          this.cities = [];
          this.filteredOptionsCity = null;
          return;
        }
        this.cities = data[0].localidad;
        this.filteredOptionsCity = this.myControlCity.valueChanges
          .startWith(null)
          .map(city => (city ? this.filterCity(city) : this.cities.slice()));
        return;
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      }
    );
  }

  filterProvinces(prov: string): any[] {
    return this.provinces.filter(option => {
      return option.provincia.toLowerCase().indexOf(prov.toLowerCase()) === 0;
    });
  }

  filterCity(city: string): any[] {
    return this.cities.filter(option => {
      return option.toLowerCase().indexOf(city.toLowerCase()) === 0;
    });
  }

  filterSIns(socIns: any): any[] {
    if (typeof(socIns) == 'object'){
      return this.socialInsurances.filter(option => {
        return option.name.toLowerCase().indexOf(socIns.name.toLowerCase()) === 0;
      });
    }
    if (typeof(socIns) == 'string'){
      return this.socialInsurances.filter(option => {
        return option.name.toLowerCase().indexOf(socIns.toLowerCase()) === 0;
      });
    }
  }

  displayFnProv(prov: string): string {
    if (prov) {
      return prov;
    }
  }

  displayFnCity(city: string): string {
    if (city) {
      return city;
    }
  }

  displaySIns(socIns: any): string {
    if (socIns) {
      return socIns.name;
    }
  }

  checkProvSelection(input: string){
    let exist = this.provinces.find(x => x.provincia === input);
    if (exist){
      return true;
    }
    this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Provincia', debe seleccionar una opción de la lista.");
    return false;
  }

  checkCitySelection(input: string){
    let exist = this.cities.find(x => x === input);
    if (exist){
      return true;
    }
    this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Ciudad', debe seleccionar una opción de la lista.");
    return false;
  }

  checkSocInsSelection(input: string): boolean{
  let exist = this.socialInsurances.find(x => x.name === input);
  if (exist){
    return true;
  }
  this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Obra Social', debe seleccionar una opción de la lista.");
  return false;
}

}
