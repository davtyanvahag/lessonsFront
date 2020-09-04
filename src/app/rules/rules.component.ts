import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  rules: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getRules().subscribe( (res: any) => {
      if (!res.error) {
        this.rules = res.data[0];
      }
    });
  }

}
