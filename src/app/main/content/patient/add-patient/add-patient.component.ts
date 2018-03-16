import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
/* Services */
import {PatientService} from '../../../services/patient.service';
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
import {LocationService} from '../../../services/location.service';
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

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  providers: [
    PatientService,
    SocialInsuranceService,
    LocationService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class AddPatientComponent implements OnInit {
  action: string;
  title: string;
  message: string;
  messageClass: string;
  patient: any;
  socialInsurances: any;
  socialInsurance: any;
  id_patient = "new";
  province: any;
  provinces:any;
  cities:any;

  constructor(private _patientService: PatientService, private _socialInsuranceService: SocialInsuranceService,
              private _locationService:LocationService, private _router: Router, private _activatedRoute: ActivatedRoute,
              private dialog : DialogConfigComponent, public alert: AlertComponent) {
    this.action = 'Guardar';
    this.title = 'Agregar Paciente';
    this.patient = new Patient();
    this.patient.socialInsurance = new PatientSocialInsurance();
    /*PHONE*/
    this.patient.phones = new Phone();
    this.patient.phones.main = true;
    this.patient.phones.type = 'Celular';
    /*ADDRESS*/
    this.patient.address = new Address();
    /*SOCIAL INSURANCE*/
    this.socialInsurances = new Array();
    this.socialInsurance = new PatientSocialInsurance();
  }

  ngOnInit() {
    this.getSocialInsurances();
    this.getProvinces();
  }

  onSubmit() {
    this.savePatient();
  }

  onChange(){
    this._locationService.getCities(this.province).subscribe(data => {
      this.patient.address.state = this.province;
      this.cities = data[0].localidad;
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    })
  }

  savePatient() {
    this._patientService.getPatientByDoc(this.patient.id).subscribe(data => {
      if (data) {
        this.alert.openErrorSnackBar(this.alert.errorDuplicado);
      } else {
        this._patientService.savePatient(this.patient).subscribe(data => {
          this.alert.openSuccessSnackBar(this.alert.successPatient);
        });
      }
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

  getSocialInsurances() {
    this._socialInsuranceService.getSocialInsurance().subscribe(response => {
      this.socialInsurances = response;
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }
  getProvinces(){
    this._locationService.getProvinces().subscribe(data => {
      this.provinces = data;
    },
    err => {
      this.alert.openErrorSnackBar(this.alert.genericError);
    });
  }

}
