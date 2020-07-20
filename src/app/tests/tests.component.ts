import { Component, OnInit } from '@angular/core';
import {TestsService} from './tests.service';
import {NgSelectConfig} from '@ng-select/ng-select';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  categoryId: string;
  subCategoryId: string;
  specialties: any = [];
  subSpeciatlties: any = [];
  tests: any;
  total: number;
  page: number;
  limit: number;
  init: boolean;
  search: any;
  constructor(private testsService: TestsService) {
  }

  ngOnInit() {
    this.init = true;
    this.page = 1;
    this.limit = 6;
    this.search = {
      title: '',
      categoryId: '',
      subCategoryId: ''
    }
    this.getSpecialties('');
    this.getSubSpecialties({name: '', category_id: ''});
    this.getTests();
  }

  getTests() {
    this.testsService.getTestsAll(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.tests = res.data;
        this.total = res.total;
      }
    });
  }


  searchCategories(e) {
    this.getSpecialties(e.term);
  }
  getCatId() {
    this.getSubSpecialties({name: '', category_id: this.search.categoryId});
    this.getTests();
  }
  searchSubCategories(e) {
    this.getSubSpecialties({name: e.term, category_id: this.search.categoryId});
  }

  getSpecialties(name) {
    this.testsService.getSpecialties(1, 15, {name}).subscribe((res: any) => {
      if (!res.error) {
        this.specialties = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  getSubSpecialties(obj) {
    this.testsService.getSubSpecialties(1, 15,  obj).subscribe((res: any) => {
      if (!res.error) {
        this.subSpeciatlties = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getTests();
  }

  next(): void {
    this.page++;
    this.getTests();
  }

  prev(): void {
    this.page--;
    this.getTests();
  }

}
