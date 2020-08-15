import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']);
  }

}
