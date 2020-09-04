import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getLessons().subscribe( (res: any) => {
      if (!res.error) {
        this.lessons = res.data[0];
      }
    });
  }


}
