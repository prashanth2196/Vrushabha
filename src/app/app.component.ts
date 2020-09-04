import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { UtilityService } from './common/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ui';
  constructor(private utilityService: UtilityService) {}
  ngOnInit(): void {
    AOS.init({ duration: 2400 });
    this.utilityService
      .getSettings()
      .pipe()
      .subscribe(
        (url) => {
          this.utilityService.defaultUrl = url.defaultUrl;
          console.log(this.utilityService.defaultUrl);
        },
        (error) => {}
      );
  }
}
