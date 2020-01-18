import { Pipe, PipeTransform } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/operator/map';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url): Observable<SafeUrl> {
    let header = new HttpHeaders();
    header = header.append('Accept', 'image/png');
    return this.http
      .get(url, { responseType: 'blob', headers: header})
      .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
  }

}
