import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//importar servicios
//importar parametros
import { LoginIn } from '../../methodParameters/loginIn';
//importar pagina autenticacion

//importar pagina dashboard
import { MyApp } from '../../../../app/app.component';
import { LoginService } from '../../../../providers/login-service';
import { Security } from '../../methodParameters/security';
import { GetAccountPage } from '../../../../client/info/components/getAccount/getAccount';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formauth: FormGroup;

  login: LoginIn;
  public channel: any;
  public language: any;

  public email: any;
  public password: any;

  public response: any;

  constructor(public formBuilder: FormBuilder, public menu: MenuController, public loginService: LoginService,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.login = new LoginIn();
    this.formauth = this.formBuilder.group
      ({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        channel: ['', [Validators.required]],
        language: ['', [Validators.required]],
      });
  }

  /**
   * Metodo incial pagina activa
   */
  ionViewDidLoad() {
  }

  //metodo modicado post, para aceptar cualquier caracter de contraseña
  gologin() {
    let loading = this.loadingCtrl.create({
      content: 'Procesando Informacion...'
    });
    loading.present();
    let loginIn = new LoginIn();
    loginIn.security = new Security();
    loginIn.channelId = this.channel;
    loginIn.language = this.language;
    loginIn.username = this.email;
    loginIn.password = this.password;
    loginIn.security.ip = "127.0.0.1";
    loginIn.security.host = "localhost";
    loginIn.security.cookie = "cookie";
    loginIn.security.userAgent = "Application";
    loginIn.security.deviceFingerPrint = "device";
    console.log('loginIn', loginIn);
    this.loginService.postLogin(loginIn)
      .then
      (
        (data) => {
          console.log(data);
          this.response = data;
          if (this.response.operationResult.code == 200) {
            this.alerta("Ingreso exitoso");
            this.goAccountPage();
          }
          else if (this.response.operationResult.code == 105) {
            this.alerta("Correo Electrónico no es válido.");
          }
          else if (this.response.operationResult.code == 2003) {
            this.alerta("La contraseña no coincide. tienes 5 intentos, luego se te bloqueara la cuenta.");
          }

          loading.dismissAll();
        }
      )
      .catch
      (
        (error) => {
          this.alerta("Se ha presentado un error, compruebe los datos y vuelva a intentar");
          loading.dismissAll();
        }
      )
  }

  goAccountPage() {
    this.navCtrl.setRoot(GetAccountPage, {
      email: this.email,
      channel: this.channel,
      language: this.language
    });
  }

  alerta(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: '<b>Mensaje</b>',
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
