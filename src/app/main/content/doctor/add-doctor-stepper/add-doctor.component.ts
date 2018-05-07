import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Services */
import { ProfessionalService } from '../../../services/professional.service';
import { SocialInsuranceService } from '../../../services/socialInsurance.service';
import { LocationService } from '../../../services/location.service';
/* Models */
import { Professional } from '../../../models/Professional';
import { Phone } from '../../../models/Phone';
import { Address } from '../../../models/Address';
import { SocialInsurance } from '../../../models/SocialInsurance';
/*Dialog*/
import { DialogConfigComponent } from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';

@Component({
    selector   : 'app-add-doctor',
    templateUrl: './add-doctor.component.html',
    styleUrls  : ['./add-doctor.component.scss'],
    providers: [
      ProfessionalService,
      SocialInsuranceService,
      LocationService,
      DialogConfigComponent,
      AlertComponent
    ]
})
export class AddDoctorComponent2 implements OnInit
{
    action: string;
    title: string;
    professional: any;
    socialInsurances: any;
    socialInsurance: SocialInsurance;
    id_doctor = 'new';
    provinces: any;
    cities: any;

    myControlProv = new FormControl();
    myControlCity = new FormControl();
    myControlSIns = new FormControl();
    filteredOptionsProv: Observable<any[]>;
    filteredOptionsSIns: Observable<any[]>;
    filteredOptionsCity: Observable<any[]>;
    form: FormGroup;

    // Horizontal Stepper
    Step1: FormGroup;
    Step2: FormGroup;
    Step3: FormGroup;
    Step4: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private _professionalService: ProfessionalService,
                private _socialInsuranceService: SocialInsuranceService,
                private _locationService: LocationService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                public dialogConfig: DialogConfigComponent,
                public alert: AlertComponent)
    {

        this.action = 'Guardar';
        this.title = 'Agregar Licenciado';
        this.professional = new Professional();
        this.socialInsurances = new Array();
        /*PHONE*/
        this.professional.phones = new Phone();
        this.professional.phones.main = true;
        this.professional.phones.type = 'Celular';
        /*ADDRESS*/
        this.professional.address = new Address();
        /*SOCIAL INSURANCE*/
        this.socialInsurances = new Array();
        /*Provincias*/
        this.provinces = new Array();

    }

    ngOnInit()
    {
        this.getSocialInsurances();
        this.getProvinces();
        // Horizontal Stepper form steps
        this.Step1 = this.formBuilder.group({
            name: ['', Validators.required],
            lastName : ['', Validators.required],
            id : ['', Validators.required],
            phonesNumber : ['', Validators.required],
            email : [''],
            birthDate : [''],
            gender : [''],
            prov : [''],
            city : [''],
            addressStreet : ['']
        });

        this.Step2 = this.formBuilder.group({
            professionalLicense: ['', Validators.required],
            professionalSpecialities : ['', Validators.required]
        });

        this.Step3 = this.formBuilder.group({
        });

        this.Step4 = this.formBuilder.group({
        });


    }



    saveAll()
    {
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
      /*
      if (this.socialInsurance.name){
          if (!this.checkSocInsSelection(this.socialInsurance.name)){
              return;
          }
      }
      */
      this.saveProfessional();
    }

    onChange() {
        if (!this.professional.address.state) {
            return;
        }
        this.professional.address.city = null;
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

    saveProfessional() {
      this._professionalService.getProfessionalByDoc(this.professional.id).subscribe(
        data => {
          if (data) {
            this.alert.openErrorSnackBar(this.alert.errorDocumentoDuplicado);
          } else {
            this._professionalService.saveProfessional(this.professional).subscribe(data => {
              this.alert.openSuccessSnackBar(this.alert.successProfessional);
            });
          }
        },
        err => {
          this.alert.openErrorSnackBar(this.alert.genericError);
        }
      );
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
      if (typeof(socIns) === 'object'){
        return this.socialInsurances.filter(option => {
          return option.name.toLowerCase().indexOf(socIns.name.toLowerCase()) === 0;
        });
      }
      if (typeof(socIns) === 'string'){
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
