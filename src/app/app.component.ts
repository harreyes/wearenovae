import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewController } from 'ionic-angular';
//importar paginas
import { LoginPage } from '../administration/authentication/components/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild(ViewController) viewCtrl: ViewController;

    rootPage: any;
    user: any = [];


    constructor(private alertCtrl: AlertController, public menu: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
         this.initializeApp();
    }

    /**
     * Metodo para iniciar configuracion de la app
     */
    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.rootPage = LoginPage;
        });
    }


    alerta(mensaje: string) {
        let alert = this.alertCtrl.create({
          title: '<b>Acerca de</b>',
          subTitle: mensaje,
          buttons: ['Aceptar']
        });
        alert.present();
      }

}


