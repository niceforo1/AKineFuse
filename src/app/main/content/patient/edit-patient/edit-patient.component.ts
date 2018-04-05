import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/* Services */
import {PatientService} from '../../../services/patient.service';
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
import { LocationService } from '../../../services/location.service';
/* Models */
import {Patient} from '../../../models/patient';
import {PatientSocialInsurance} from '../../../models/patientSocialInsurance';
import {Address} from '../../../models/Address';
import {Phone} from '../../../models/Phone';
import {SocialInsurance} from '../../../models/SocialInsurance';
/*Dialog*/
import { DialogConfigComponent }from '../../dialog/dialogConfig.component';
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
  selector: 'app-edit-patient',
  templateUrl: '../add-patient/add-patient.component.html',
  providers: [
    PatientService,
    SocialInsuranceService,
    LocationService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class EditPatientComponent implements OnInit {
  action: string;
  title: string;
  patient: any;
  socialInsurances: any;
  socialInsurance: SocialInsurance;
  id_patient : string;
  provinces: any;
  cities: any;

  myControlProv = new FormControl();
  myControlCity = new FormControl();
  myControlSIns = new FormControl();
  filteredOptionsProv: Observable<any[]>;
  filteredOptionsSIns: Observable<any[]>;
  filteredOptionsCity: Observable<any[]>;

  constructor(private _patientService: PatientService, private _socialInsuranceService: SocialInsuranceService,
              private _router: Router, private _activatedRoute: ActivatedRoute, public dialogConfig: DialogConfigComponent,
              public alert: AlertComponent,
              private _locationService: LocationService) {
    this.action = 'Editar';
    this.title = 'Editar Paciente';
    this.patient = new Patient();
    this.patient.socialInsurance = new PatientSocialInsurance();
    this.socialInsurance = new SocialInsurance();
    this.patient.phones = new Phone();
    this.patient.address = new Address();
    this.socialInsurances = new Array();
    /*Provincias*/
    this.provinces = new Array();
  }

  ngOnInit() {
    this.getProvinces();
    this.getSocialInsurances();
    this.getPatients();
  }

  onSubmit() {
    if(!this.checkProvSelection(this.patient.address.state)){
      this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Provincia', debe seleccionar una opción de la lista.");
      return;
    }
    if(!this.checkCitySelection(this.patient.address.city)){
      this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Ciudad', debe seleccionar una opción de la lista.");
      return;
    }
    if(!this.checkSocInsSelection(this.socialInsurance.name)){
      this.alert.openCustomMsgErrorSnackBar("Verifique el campo 'Obra Social', debe seleccionar una opción de la lista.");
      return;
    }
    this.savePatient();
  }

  onChange() {
    if (!this.patient.address.state) {
      return;
    }
    this.getCities();
  }

  savePatient() {
    this.patient.socialInsurance._id = this.socialInsurance._id;
    this._patientService.updatePatient(this.patient, this.patient._id).subscribe(data => {
      this.alert.openSuccessSnackBar(this.alert.successPatient);
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

  getPatients(){
    this._activatedRoute.params.forEach((params:Params)=>{
      this.id_patient = params['id'];
      this._patientService.searchPatient(this.id_patient).subscribe(response => {
        this.patient = response;
        this.socialInsurance = this.patient.socialInsurance._id;
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
    this._locationService.getCities(this.patient.address.state).subscribe(
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
    if(typeof(socIns) == 'object'){
      return this.socialInsurances.filter(option => {
        return option.name.toLowerCase().indexOf(socIns.name.toLowerCase()) === 0;
      });
    };
    if(typeof(socIns) == 'string'){
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

  checkProvSelection(input: string): boolean{
    var exist = this.provinces.find(x => x.provincia === input);
    if(exist){
      return true;
    }
    return false;
  }

  checkCitySelection(input: string): boolean{
    var exist = this.cities.find(x => x === input);
    if(exist){
      return true;
    }
    return false;
  }

  checkSocInsSelection(input: string): boolean{
    var exist = this.socialInsurances.find(x => x.name === input);
    if(exist){
      return true;
    }
    return false;
  }

}
