import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SingleTestService} from './single-test.service';
import {SharedService} from '../shared/shared.service';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-signgle-test',
  templateUrl: './signgle-test.component.html',
  styleUrls: ['./signgle-test.component.css']
})
export class SigngleTestComponent implements OnInit {

  testId: string;
  singleTest: any;
  userOrder: any;
  modalShowHide: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private singleTestService: SingleTestService) { }

  ngOnInit() {
    this.userOrder = {
      test_id: '',
      order_price: 0,
      order_status: 0,
    };
    this.modalShowHide = false;
    this.route.params.subscribe((param) => {
      this.testId = param.id;
      console.log(param.id);
      this.singleTestService.getOneFront(param.id).subscribe( (res: any) => {
        if (!res.error) {
          this.singleTest = res.data;
        }
      });
    });
  }

  order(orderStatus) {
    if (localStorage.getItem('token')) {
      this.sharedService.currentUser().subscribe( (res: any) => {
        if (!res.error && res.user && res.user !== null) {
          this.userOrder.test_id = this.singleTest._id;
          this.userOrder.order_price = this.singleTest.price;
          if (this.singleTest.price > 0) {
            this.userOrder.order_status = 1;
            this.singleTestService.order(this.userOrder).subscribe( (resp: any) => {
              if (!resp.error) {
                console.log(resp.data.order_id)
                const hrefUrl = document.location.protocol + '//' + document.location.hostname + '/my-page';
                this.singleTestService.paymanet({
                  url: hrefUrl,
                  price: this.userOrder.order_price,
                  orderid: resp.data.order_id
                }).subscribe( (re: any) => {
                  const data = JSON.parse(re.data);
                  if (!re.error) {
                    this.singleTestService.updateUsedSum({_id: this.singleTest._id}).subscribe( (response: any) => {
                      if (!response.error) {
                        this.singleTestService.updateUserOrderLastDate({_id: res.user._id, order_id: data.orderId}).subscribe( (r: any) => {
                          if (!r.error) {
                            window.open(data.formUrl, '_blank');
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          } else {
            this.userOrder.order_status = 5;
            this.singleTestService.order(this.userOrder).subscribe( (resp: any) => {
              if (!resp.error) {
                this.singleTestService.order(this.userOrder).subscribe( (re: any) => {
                  if (!re.error) {
                  this.singleTestService.updateUsedSum({_id: this.singleTest._id}).subscribe( (response: any) => {
                    if (!response.error) {
                      this.singleTestService.updateUserOrderLastDate({_id: res.user._id}).subscribe( (r: any) => {
                        if (!r.error) {
                          this.router.navigate(['/my-page/my-tests']);
                        }
                      });
                    }
                  });
                  }
                });
              }
            });
          }
        } else {
          this.modalShowHide = true;
        }
      });
    } else {
      this.modalShowHide = true;
    }
  }

}
