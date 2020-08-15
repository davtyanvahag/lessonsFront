import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './account.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-edit-my-account',
  templateUrl: './edit-my-account.component.html',
  styleUrls: ['./edit-my-account.component.css']
})
export class EditMyAccountComponent implements OnInit {
  token: string;
  resPassMessage: string;
  passReset: number;
  pageEtitResMessage: string;
  pageEtitRes: number;
  error: any;
  updatePassword: any;
  /*
  step 1 update, 2 update password
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

  constructor(private accountService: AccountService,
              private sharedService: SharedService,
              private router: Router) {
    this.sharedService.hasSideBarStatus(true);
  }

  ngOnInit() {
    this.passReset = 0;
    this.pageEtitRes = 0;
    this.updatePassword = {
      oldPassword: '',
      newPassword: '',
      newConfPassword: '',
    };
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
        newPassbool: false,
        newPassConfbool: false,
        message: '',
        messagenewPassbool: '',
        messagenewPassConfbool: '',
      },
      sms: {
        bool: false,
        message: ''
      },
    };
    this.accountService.getCurrenUser().subscribe( (res: any) => {
      if (!res.error) {
        this.user = res.user;
        this.user.phoneNumber = res.user.phone;
        console.log(this.user);
      }
    });
  }

  update() {
    this.validateFirstName();
    this.validateLastName();
    this.validateSureName();
    this.validateEmail();
    this.validatePhone();
    this.validateDob();
    if (this.error.email.bool || this.error.firstName.bool || this.error.lastName.bool
      || this.error.sureName.bool || this.error.dob.bool || this.error.phoneNumber.bool) {
      return false;
    }
    this.user.gender = Number(this.user.gender);
    this.accountService.update(this.user).subscribe((res: any) => {
      if (!res.error) {
        this.pageEtitRes = 3;
      } else {
        this.pageEtitResMessage = res.message;
        this.pageEtitRes = 2;
      }
    });
  }

  resetPassword() {
    this.validatePassword();
    this.validateNewPassword();
    this.validateNewPasswordConfirm();
    console.log(this.error.password.bool, this.error.password.newPassbool, this.error.password.newPassConfbool);
    if (this.error.password.bool || this.error.password.newPassbool || this.error.password.newPassConfbool ) {
      return false;
    }
    this.accountService.resetPassword(this.updatePassword).subscribe((res: any) => {
      if (!res.error) {
        this.passReset = 1;
      } else {
        this.resPassMessage = res.message;
        this.passReset = 2;
      }
    });
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
      // if (!this.validateDate(this.user.dob)) {
      //   this.error.dob.bool = true;
      //   this.error.dob.message = 'Ծննդյան ամիս ամսաթիվը վավեր չէ';
      // } else {
        this.error.dob.bool = false;
      // }
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  validatePassword() {
    if (!this.updatePassword.oldPassword || typeof this.updatePassword.oldPassword === 'undefined' || this.updatePassword.oldPassword.length < 6) {
      this.error.password.bool = true;
      this.error.password.message = 'Գաղտնաբառը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      this.error.password.bool = false;
    }
  }
  validateNewPassword() {
    if (!this.updatePassword.newPassword || typeof this.updatePassword.newPassword === 'undefined' || this.updatePassword.newPassword.length < 6) {
      this.error.password.newPassbool = true;
      this.error.password.messagenewPassbool = 'Նոր Գաղտնաբառը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      this.error.password.newPassbool = false;
    }
  }
  validateNewPasswordConfirm() {
    console.log(this.updatePassword.newPassword, this.updatePassword.newConfPassword, this.updatePassword.newPassword !== this.updatePassword.newConfPassword);
    if (!this.updatePassword.newConfPassword || typeof this.updatePassword.newConfPassword === 'undefined' || this.updatePassword.newConfPassword.length < 6) {
      this.error.password.newPassConfbool = true;
      this.error.password.messagenewPassConfbool = 'նոր գաղտնաբառի կրկնօրինակը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      if (this.updatePassword.newPassword !== this.updatePassword.newConfPassword) {
        this.error.password.newPassConfbool = true;
        this.error.password.messagenewPassConfbool = 'նոր գաղտնաբառի կրկնօրինակը չի համապատասխանում';
      } else {
        this.error.password.newPassConfbool = false;
      }
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

  getDate() {
    return new Date();
  }
}
