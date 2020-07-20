import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  showsideBar: boolean;

  constructor(private router: Router,
              private sharedService: SharedService) {
    sharedService.hasSideBar$.subscribe( res => {
      console.log('sidebar', res);
      this.showsideBar = res;
    });
  }

  ngOnInit() {
    this.router.navigate(['/my-page/my-tests']);
  }

}
