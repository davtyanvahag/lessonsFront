import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('news', { static: false }) news;
  @ViewChild('tests', { static: false }) tests;
  @ViewChild('contacts', { static: false }) contacts;

  constructor(private viewportScroller: ViewportScroller) {
    // console.log(this.router.getCurrentNavigation().extras.state);
    // if (this.router.getCurrentNavigation().extras.state) {
    //   document.getElementById(this.router.getCurrentNavigation().extras.state.id).scrollIntoView({ behavior: 'smooth' });
    // }
  }

  ngAfterViewInit() {
    if ( history.state && history.state.id && history.state.id != null) {
      this.viewportScroller.scrollToAnchor(history.state.id );
      document.getElementById(history.state.id).scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit() {
    if ( history.state && history.state.id && history.state.id != null) {
      console.log('history1', history.state.id, document.getElementById(history.state.id));
      const element = document.getElementById(history.state.id);
      if (element) {
        console.log('history2', history.state.id);
        setTimeout(() => {
          element.scrollIntoView({behavior: 'smooth'});
        }, 10);
      }
    }

    // this.activatedRoute.data.subscribe(data => {
    //   console.log(data);
    // });
  }

  navigateTo(element: string) {
    console.log(document.getElementById(element));
    document.getElementById(element).scrollIntoView({ behavior: 'smooth' });
  }

}
