import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() Navigate = new EventEmitter();

  constructor(private router: Router) {
  }
  ngOnInit() {}

  navigateTo(element: string) {
    this.router.navigateByUrl('/home', { state: {id: element} });
    this.Navigate.emit(element);
  }

}
