import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';
import { LoginService22 } from '../../services/login.service';

@Component({
  selector: 'fuse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService22],
  animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  gralError: string = null;
  @Output() isLogged = new EventEmitter();

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private _loginService: LoginService22
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  onSubmit() {
    this._loginService
      .login({
        username: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      })
      .subscribe(
        data => {
          console.log('DATA', data);
          console.log('DATA-tok', data['token']);
          localStorage.setItem('token', JSON.stringify(data['token']));
          this.isLogged.emit({ isLogged: true });
        },
        err => {
          console.log('ERROR', err.error.message);
          // this.isLogged.emit({ isLogged: false });
          this.gralError = err.error.message;
        }
      );
  }
}
