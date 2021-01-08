import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';


//Pagina inicio
import { MyApp } from './app.component';
//paginas
import { LoginPage } from '../administration/authentication/components/login/login';

//provider  

//importar plugin 
import { Camera } from '@ionic-native/camera'
import { LoginService } from '../providers/login-service';
import { GetAccountPage } from '../client/info/components/getAccount/getAccount';
import { InfoService } from '../providers/info-service';

@NgModule({
    declarations: [

        MyApp,
        LoginPage,
        GetAccountPage        
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        GetAccountPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        Geolocation,
        Network,
        LoginService,
        InfoService,
        //{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        
    ]
})
export class AppModule { }
