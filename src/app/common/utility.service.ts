import { Injectable, Inject } from '@angular/core';
// import {AppInjector} from '../app-injector';
// import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public user_name: string;
  public role: string;
  public defaultUrl:string;
  constructor(private http: HttpClient){
  }

  setUserName(userName: string) {
    this.user_name = userName;
  }
  setUserRole(role: string) {
    this.role = role;
  }
  getSettings() {
    return this.http.get<any>('assets/appsetting.json', {})
      .pipe(map(result => {
        this.defaultUrl = result.defaultUrl;
        return result;
      }));
  }

//getMLValue(defaultValue: string, jsonMLString: string): string {
//  return (typeof jsonMLString != 'undefined' && jsonMLString != "" && typeof this.langCode != 'undefined' && this.langCode != "") ?
//    JSON.parse(jsonMLString)[this.langCode] == null ? defaultValue : JSON.parse(jsonMLString)[this.langCode] : defaultValue;
//
//showNotificationPopup(type: any, title: string = null, html: string = null, text: string = null) {
//  const myService = AppInjector.get(ToasterService);
//  myService.show(type," ",title,Config.PopupTimer);
//}

  try_parse_int(val) {
    try {
      if (val != null && val != undefined) {
        if (!isNaN(val))
          return parseInt(val);
      }
      return -1;
    }
    catch (err) {
      return -1;
    }
  }

  checkJsonFormattor(stringML: any, labelName: string): boolean {
    try {
      if (stringML) {
        if (!this.JsonValidator(stringML)) {
        //   this.showNotificationPopup('warning', 'JSON is not proper for '+ labelName);
          return false;
        }
      }
    } catch (ex) {
      return false;
    }
    return true;
  }

  private JsonValidator(value: string): boolean {
    try {
      return JSON.parse(value) ? true : false
    }
    catch (ex) {
      return false;
    }
  }
}
