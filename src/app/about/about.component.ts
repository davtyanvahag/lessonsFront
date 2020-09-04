import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getAbout().subscribe( (res: any) => {
      if (!res.error) {
        this.about = res.data[0];
      }
    });
  }

  navigateTo(element: string) {
    console.log(document.getElementById(element));
    document.getElementById(element).scrollIntoView({ behavior: 'smooth' });
  }

}
