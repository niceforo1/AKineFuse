import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/* Services */
import {PatientService} from '../../../services/patient.service';
import {SocialInsuranceService} from '../../../services/socialInsurance.service';
/* Models */
import {Patient} from '../../../models/patient';
import {PatientSocialInsurance} from '../../../models/patientSocialInsurance';
import {Address} from '../../../models/Address';
import {Phone} from '../../../models/Phone';
/*Dialog*/
import { DialogConfigComponent }from '../../dialog/dialogConfig.component';
/*Alert*/
import { AlertComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-edit-patient',
  templateUrl: '../add-patient/add-patient.component.html',
  providers: [
    PatientService,
    SocialInsuranceService,
    DialogConfigComponent,
    AlertComponent
  ]
})

export class EditPatientComponent implements OnInit {
  action: string;
  title: string;
  message: string;
  messageClass: string;
  patient: any;
  socialInsurances: any;
  socialInsurance: PatientSocialInsurance;
  id_patient : string;

  constructor(private _patientService: PatientService, private _socialInsuranceService: SocialInsuranceService,
              private _router: Router, private _activatedRoute: ActivatedRoute, public dialogConfig: DialogConfigComponent,
              public alert: AlertComponent) {
    this.action = 'Editar';
    this.title = 'Editar Paciente';
    this.patient = new Patient();
    this.patient.socialInsurance = new PatientSocialInsurance();
    this.patient.phones = new Phone();
    this.patient.address = new Address();
    this.socialInsurances = new Array();
    this.socialInsurance = new PatientSocialInsurance();
  }

  ngOnInit() {
    this.getSocialInsurances();
    this.getPatients();
  }

  onSubmit() {
    this.savePatient();
  }

  savePatient() {
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
      },
      err => {
        this.alert.openErrorSnackBar(this.alert.genericError);
      });
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

}
