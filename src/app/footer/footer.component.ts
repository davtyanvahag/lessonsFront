import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contacts: any;
  about: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getContacts().subscribe((res: any) => {
      if ( !res.error ) {
        this.contacts = res.data[0];
      }
    });

    this.sharedService.getAbout().subscribe((res: any) => {
      if ( !res.error ) {
        this.about = res.data[0];
      }
    });
  }

}
