
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//#endregion
import { Observable } from "rxjs";
import { LoginIn } from "../administration/authentication/methodParameters/loginIn";
import { GetAccountEmailIn } from "../administration/authentication/methodParameters/getAccountEmailIn";
import { GetAccountTokenIn } from "../administration/authentication/methodParameters/getAccountTokenIn";


@Injectable()
export class InfoService {
    data: any;
    error: any;

    postInfoEmail: string = "https://devauth-api.alle2020.com/v1/getAccount2";
    postInfoToken: string = "https://devauth-api.alle2020.com/v1/getAccount2";

    constructor(public http: Http) {
        this.data = null;
    }

    /**
     *
     * @param {getInfoAccountInterfaz} getAccountEmailIn
     * @returns {Promise} 
     */
    postInfoAccountEmail(getAccountEmailIn: GetAccountEmailIn) {
        let url = this.postInfoEmail;
        let body = getAccountEmailIn;
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

    /**
     *
     * @param {getInfoAccountTokenInterfaz} getAccountTokenIn
     * @returns {Promise} 
     */
    postInfoAccountToken(getAccountTokenIn: GetAccountTokenIn) {
        let url = this.postInfoToken;
        let body = getAccountTokenIn;
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