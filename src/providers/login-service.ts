
import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//#endregion
import { Observable } from "rxjs";
import { LoginIn } from "../administration/authentication/methodParameters/loginIn";


@Injectable()
export class LoginService {
    data: any;
	error: any;
	
    getrequest: string = "https://devauth-api.alle2020.com/v1/login";

	constructor(public http: Http) {
        this.data = null;
	}

	/**
     *
     * @param {LoginInterfaz} logininfo
     * @returns {Promise} 
     */
    postLogin(loginIn: LoginIn) {
        let url = this.getrequest;
        let body = loginIn;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise
            (
            (resolve, reject) => {
                this.http.post(url, body, options)
                    .map(res => res.json())
                    .subscribe
                    (
                    data => { resolve(data); },
                    error => {
                        reject(error)
                    }
                    )
            }
            );
    }
	
}