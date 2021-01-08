import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAccountEmailIn } from '../../../../administration/authentication/methodParameters/getAccountEmailIn';
import { Security } from '../../../../administration/authentication/methodParameters/security';
import { InfoService } from '../../../../providers/info-service';
import { LoginPage } from '../../../../administration/authentication/components/login/login';
import { GetAccountTokenIn } from '../../../../administration/authentication/methodParameters/getAccountTokenIn';

//importar servicios
//importar parametros

//importar paginas


@Component({
  selector: 'page-getAccount',
  templateUrl: 'getAccount.html',
})
export class GetAccountPage {

  public formauth: FormGroup;
  public channel: any;
  public language: any;

  public infoClient: any;
  public infoClientToken: any;
  public email: any;
  public firstName: any;
  public lastName: any;

  public escapeBot: any;
  public id: any;
  public balance: any;
  public bin: any;

  public certificateNumber: any;
  public escapeBotToken: any;
  public idToken: any;
  public balanceToken: any;
  public binToken: any;


  constructor(public formBuilder: FormBuilder, public menu: MenuController, public infoService: InfoService,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.email = this.navParams.get("email");
    this.channel = this.navParams.get("channel");
    this.language = this.navParams.get("language");
  }

  /**
   * Metodo incial pagina activa
   */
  ionViewDidLoad() {
    this.getInfoAccount();
    this.getInfoToken();
  }

  getInfoAccount() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Información...'
    });
    loading.present();
    let getAccountEmailIn = new GetAccountEmailIn();
    getAccountEmailIn.security = new Security();
    getAccountEmailIn.channelId = this.channel;
    getAccountEmailIn.language = this.language;
    getAccountEmailIn.email = this.email;
    getAccountEmailIn.security.ip = "127.0.0.1";
    getAccountEmailIn.security.host = "localhost";
    getAccountEmailIn.security.cookie = "cookie";
    getAccountEmailIn.security.userAgent = "Application";
    getAccountEmailIn.security.deviceFingerPrint = "device";
    console.log('getAccountEmailIn', getAccountEmailIn);
    this.infoService.postInfoAccountEmail(getAccountEmailIn)
      .then
      (
        (data) => {
          console.log(data);
          loading.dismissAll();
          this.infoClient = data;
          console.log('infoClient', this.infoClient);
          this.firstName = this.infoClient.accountResultDto.accountSumaryDto.firstName;
          this.lastName = this.infoClient.accountResultDto.accountSumaryDto.lastName1;
          this.escapeBot = this.infoClient.escapeBot
          this.id = this.infoClient.accountResultDto.accountId;
          this.bin = this.infoClient.accountResultDto.bin;
          this.balance = this.infoClient.accountResultDto.balance;
        }
      )
      .catch
      (
        (error) => {
          this.alerta("Se ha presentado un error cargando información del cliente");
          loading.dismissAll();
        }
      )
  }

  getInfoToken() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Información...'
    });
    loading.present();
    let getAccountTokenIn = new GetAccountTokenIn();
    getAccountTokenIn.security = new Security();
    getAccountTokenIn.channelId = this.channel;
    getAccountTokenIn.language = this.language;
    getAccountTokenIn.certificateNumber = "LM000e0000593";
    getAccountTokenIn.authenticationtoken = "zVhf5twG1f3hP3Rkundr2fUYTLEHSCOG8Qua25GkMKw=:/6i9uRguGojhtSmm3hV7fX39TIAZpHerkeDf42fNXa4=";
    getAccountTokenIn.security.ip = "127.0.0.1";
    getAccountTokenIn.security.host = "localhost";
    getAccountTokenIn.security.cookie = "cookie";
    getAccountTokenIn.security.userAgent = "Application";
    getAccountTokenIn.security.deviceFingerPrint = "device";
    console.log('getAccountTokenIn', getAccountTokenIn);
    this.infoService.postInfoAccountToken(getAccountTokenIn)
      .then
      (
        (data) => {
          console.log(data);
          loading.dismissAll();
          this.infoClientToken = data;
          
          this.escapeBotToken = this.infoClientToken.escapeBot
          this.idToken = this.infoClientToken.accountResultDto.accountId;
          this.binToken = this.infoClientToken.accountResultDto.bin;
          this.balanceToken = this.infoClientToken.accountResultDto.balance;
          this.certificateNumber = this.infoClientToken.accountResultDto.certificateNumber;
          console.log('infoClientToken', this.infoClientToken);
        }
      )
      .catch
      (
        (error) => {
          this.alerta("Se ha presentado un error cargando información del cliente token");
          loading.dismissAll();
        }
      )
  }


  alerta(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: '<b>Mensaje</b>',
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  closeSesion() {
    this.navCtrl.setRoot(LoginPage);
  }

  confirmCloseSesion() {
    let alert = this.alertCtrl.create({
      title: 'CONFIRMAR',
      message: 'Al confirmar cerrará sesión.',
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'SI',
          handler: () => {
            this.closeSesion();
          }
        }
      ]
    });
    alert.present();
  }
}
