import { Component, OnInit } from '@angular/core';
import {SignUpService} from './sign-up.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error: any;
  /*
  step 1 signup, 2 sms verification
  */
  step: number;
  user: any = {
    email: '',
    firstName: '',
    lastName: '',
    sureName: '',
    gender: '1',
    dob: '',
    phoneNumber: '',
    password: '',
    company: '',
  };
  sms: string;

  constructor(private signUpService: SignUpService,
              private router: Router) { }

  ngOnInit() {
    this.step = 1;
    this.error = {
      email: {
        bool: false,
        message: ''
      },
      firstName: {
        bool: false,
        message: ''
      },
      lastName: {
        bool: false,
        message: ''
      },
      sureName: {
        bool: false,
        message: ''
      },
      dob: {
        bool: false,
        message: ''
      },
      phoneNumber: {
        bool: false,
        message: ''
      },
      password: {
        bool: false,
        message: ''
      },
      sms: {
        bool: false,
        message: ''
      },
    };
  }

  save() {
    this.validateFirstName();
    this.validateLastName();
    this.validateSureName();
    this.validateEmail();
    this.validatePhone();
    this.validateDob();
    this.validatePassword();
    let validateFields = false;
    for (const prop in this.error) {
      if (this.error[prop].bool === true) {
        validateFields = true;
      }
    }
    if (!validateFields) {
      console.log(this.user);
      /*
      send sms from signup
       */
      this.step = 2;
    } else {
      return false;
    }
  }

  confirmCode() {
    if (!this.sms || typeof this.sms === 'undefined' || this.sms.length < 5 || this.sms.length > 5) {
      this.error.sms.bool = true;
      this.error.sms.message = 'Կոդը պարտադիր դաշտ է'
      return false;
    } else {
      if (!this.smsValidation(this.sms)) {
        this.error.sms.bool = true;
        this.error.sms.message = 'Մուտքագրված կոդը սխալ է, պետք է լինի 5 նիշ, միայն թվեր';
        return false;
      }  else {
        this.user.gender = Number(this.user.gender);
        this.signUpService.signUp(this.user).subscribe((res: any) => {
          if ( !res.error) {
            this.router.navigate(['/sign-in']);
          }
        });
      }
    }
  }

  validateFirstName() {
    console.log(!this.user.firstName, typeof this.user.firstName, this.user.firstName.length);
    if (!this.user.firstName || typeof this.user.firstName === 'undefined' || this.user.firstName.length === 0) {
      this.error.firstName.bool = true;
      this.error.firstName.message = 'Անունը պարտադիր դաշտ է';
    } else {
      this.error.firstName.bool = false;
    }
  }
  validateLastName() {
    if (!this.user.lastName || typeof this.user.lastName === 'undefined' || this.user.lastName.length === 0) {
      this.error.lastName.bool = true;
      this.error.lastName.message = 'Ազգանունը պարտադիր դաշտ է';
    } else {
      this.error.lastName.bool = false;
    }
  }
  validateSureName() {
    if (!this.user.sureName || typeof this.user.sureName === 'undefined' || this.user.sureName.length === 0) {
      this.error.sureName.bool = true;
      this.error.sureName.message = 'Հայրանունը պարտադիր դաշտ է';
    } else {
      this.error.sureName.bool = false;
    }
  }
  validateEmail() {
    if (!this.user.email || typeof this.user.email === 'undefined' || this.user.email.length === 0) {
      this.error.email.bool = true;
      this.error.email.message = 'էլ. հասցեն պարտադիր դաշտ է';
    } else {
      if (!this.emailValidation(this.user.email)) {
        this.error.email.bool = true;
        this.error.email.message = 'էլ. հասցեն վավեր չէ';
      } else {
        this.error.email.bool = false;
      }
    }
  }
  validatePhone() {
    if (!this.user.phoneNumber || typeof this.user.phoneNumber === 'undefined' || this.user.phoneNumber.length === 0) {
      this.error.phoneNumber.bool = true;
      this.error.phoneNumber.message = 'Հեռախոսահամարը պարտադիր դաշտ է, +37455123456';
    } else {
      if (!this.phoneValidation(this.user.phoneNumber)) {
        this.error.phoneNumber.bool = true;
        this.error.phoneNumber.message = 'Հեռախոսահամարը վավեր չէ';
      } else {
        this.error.phoneNumber.bool = false;
      }
    }
  }
  validateDob() {
    if (!this.user.dob || typeof this.user.dob === 'undefined' || this.user.dob.length === 0) {
      this.error.dob.bool = true;
      this.error.dob.message = 'Ծննդյան ամիս ամսաթիվը պարտադիր դաշտ է, ամիս/օր/տարեթիվ';
    } else {
      if (!this.validateDate(this.user.dob)) {
        this.error.dob.bool = true;
        this.error.dob.message = 'Ծննդյան ամիս ամսաթիվը վավեր չէ';
      } else {
        this.error.dob.bool = false;
      }
    }
  }
  validatePassword() {
    if (!this.user.password || typeof this.user.password === 'undefined' || this.user.password.length < 6) {
      this.error.password.bool = true;
      this.error.password.message = 'Գաղտնաբառը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      this.error.password.bool = false;
    }
  }

  emailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  phoneValidation(phone) {
    const isphone = /^((\+)374)[0-9]{8}$/;
    return isphone.test(phone);
  }

  smsValidation(code) {
    const iscode = /^[0-9]{5}$/;
    return iscode.test(code);
  }

  validateDate(dob) {
    const dateReg = /^\d{2}([/])\d{2}\1\d{4}$/;
    if (dob.split('/') [0] > 12) {
      return false;
    } else if (dob.split('/') [1] < 31) {
      return dateReg.test(String(dob).toLowerCase());
    } else {
      return false;
    }
  }

}
