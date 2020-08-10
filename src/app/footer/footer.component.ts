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
  markers: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.markers = [];
    this.sharedService.getContacts().subscribe((res: any) => {
      if ( !res.error ) {
        this.contacts = res.data[0];
        this.contacts.address.forEach(el => {
          this.markers.push({
            position: {
              lat: Number(el.lat),
              lng: Number(el.long),
            },
            label: {
              color: 'red',
              text: 'Marker label ' + (this.markers.length + 1),
            },
            title: 'Marker title ' + (this.markers.length + 1),
            options: { animation: google.maps.Animation.BOUNCE },
          });
        });
      }
    });

    this.sharedService.getAbout().subscribe((res: any) => {
      if ( !res.error ) {
        this.about = res.data[0];
      }
    });
  }

}
