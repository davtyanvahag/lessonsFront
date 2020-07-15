import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './account.service';

@Component({
  selector: 'app-edit-my-account',
  templateUrl: './edit-my-account.component.html',
  styleUrls: ['./edit-my-account.component.css']
})
export class EditMyAccountComponent implements OnInit {
  token: string;
  user: any;

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    this.accountService.getCurrenUser().subscribe( (res: any) => {
      if (!res.error) {
        this.user = res.user;
        console.log(this.user);
      }
    });
  }

  save() {
    console.log(this.user);
    this.accountService.edit(this.user).subscribe((res: any) => {
      if ( !res.error) {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
