import { Component, OnInit } from '@angular/core';
import {SignInService} from './sign-in.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: any = {
    phoneNumber: '',
    password: ''
  };
  error: any;
  passVeryfication: any = {
    phoneNumber: '',
    smsCode: ''
  };
  newPassword: any = {
    phoneNumber: '',
    password: '',
    passwordconfirm: ''
  };
  passwordReseted = false;
  forgotPassword = false;
  verifySms = false;
  confirmPass = false;
  constructor(private signInService: SignInService,
              private router: Router) {
  }

  ngOnInit() {
    this.signInService.currentAdmin().subscribe((res: any) => {
      if (!res.error && res.user && res.user !== null) {
        this.router.navigate(['/my-page']);
      }
    });
    this.error = {
      phoneNumber: {
        bool: false,
        message: ''
      },
      password: {
        bool: false,
        message: ''
      },
      confirmPhone: {
        bool: false,
        message: ''
      },
      sms: {
        bool: false,
        message: ''
      },
      newPassword: {
        bool: false,
        confirmbool: false,
        message: ''
      },
    };
  }

  signIn() {
    this.validatePhone();
    this.validatePassword();
    if (this.error.phoneNumber.bool || this.error.password.bool) {
      return false;
    }
    this.signInService.signIn(this.user).subscribe( (res: any) => {
      if (!res.error) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/my-page']);
      } else {
        this.error.phoneNumber.bool = true;
        if (res.message === 'Invalid credentials') {
          this.error.phoneNumber.message = 'Համապատասխան տվյալներով օգտատեր չի գտնվե';
        } else {
          this.error.phoneNumber.message = 'Առկա են Տեխնիկական կամ նունականացման խնդիրներ, խնդրում ենք կապնվել օպերատորի հետ';
        }
      }
    });
  }

  // confirmCode() {
  //   if (!this.sms || typeof this.sms === 'undefined' || this.sms.length < 5 || this.sms.length > 5) {
  //     this.error.sms.bool = true;
  //     this.error.sms.message = 'Կոդը պարտադիր դաշտ է'
  //     return false;
  //   } else {
  //     if (!this.smsValidation(this.sms)) {
  //       this.error.sms.bool = true;
  //       this.error.sms.message = 'Մուտքագրված կոդը սխալ է, պետք է լինի 5 նիշ, միայն թվեր';
  //       return false;
  //     }  else {
  //       this.signUpService.confirmSmsCode({phoneNumber: this.user.phoneNumber, sms: this.sms}).subscribe((res: any) => {
  //         if ( !res.error) {
  //           this.router.navigate(['/sign-in']);
  //         } else {
  //           this.error.sms.bool = true;
  //           this.error.sms.message = 'Առկա են Տեխնիկական խնդիրներ, խնդրում ենք կապնվել օպերատորի հետ';
  //         }
  //       });
  //     }
  //   }
  // }



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

  validatePassword() {
    if (!this.user.password || typeof this.user.password === 'undefined' || this.user.password.length < 6) {
      this.error.password.bool = true;
      this.error.password.message = 'Գաղտնաբառը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      this.error.password.bool = false;
    }
  }

  validateConfirmPhone() {
    if (!this.passVeryfication.phoneNumber || typeof this.passVeryfication.phoneNumber === 'undefined' || this.passVeryfication.phoneNumber.length === 0) {
      this.error.confirmPhone.bool = true;
      this.error.confirmPhone.message = 'Հեռախոսահամարը պարտադիր դաշտ է, +37455123456';
    } else {
      if (!this.phoneValidation(this.passVeryfication.phoneNumber)) {
        this.error.confirmPhone.bool = true;
        this.error.confirmPhone.message = 'Հեռախոսահամարը վավեր չէ';
      } else {
        this.error.confirmPhone.bool = false;
      }
    }
  }

  validateSmsCode() {
    if (!this.passVeryfication.smsCode || typeof this.passVeryfication.smsCode === 'undefined' || this.passVeryfication.smsCode.length < 5 || this.passVeryfication.smsCode.length > 5) {
      this.error.confirmPhone.bool = true;
      this.error.confirmPhone.message = 'Կոդը պարտադիր դաշտ է';
    } else {
      if (!this.smsValidation(this.passVeryfication.phoneNumber)) {
        this.error.confirmPhone.bool = true;
        this.error.confirmPhone.message = 'Կոդը վավեր չէ';
      } else {
        this.error.confirmPhone.bool = false;
      }
    }
  }

  newPasswordFunc() {
    if (!this.newPassword.password || typeof this.newPassword.password === 'undefined' || this.newPassword.password.length < 6) {
      this.error.newPassword.bool = true;
      this.error.newPassword.message = 'Գաղտնաբառը պարտադիր դաշտ է, մին․ 6 սիմվոլ';
    } else {
      this.error.newPassword.bool = false;
    }
  }

  confirmNewPasswordFunc() {
    if (!this.newPassword.passwordconfirm || typeof this.newPassword.passwordconfirm === 'undefined' || this.newPassword.passwordconfirm.length < 6) {
      this.error.newPassword.confirmbool = true;
      this.error.newPassword.message = 'Գաղտնաբառի հաստատման դաշտը պարտադիր է, մին․ 6 սիմվոլ';
    } else {
      if (this.newPassword.passwordconfirm !== this.newPassword.password ) {
        this.error.newPassword.confirmbool = true;
        this.error.newPassword.message = 'Չի համապատասխանում';
      } else {
        this.error.newPassword.confirmbool = false;
      }
    }
  }


  phoneValidation(phone) {
    const isphone = /^((\+)374)[0-9]{8}$/;
    return isphone.test(phone);
  }

  smsValidation(code) {
    const iscode = /^[0-9]{5}$/;
    return iscode.test(code);
  }

  saveNewPassword() {
    this.newPasswordFunc();
    this.confirmNewPasswordFunc();
    if (this.error.newPassword.bool || this.error.newPassword.confirmbool) {
      return false;
    }
    this.newPassword.phoneNumber = this.passVeryfication.phoneNumber;
    this.signInService.resetNewPassword(this.newPassword).subscribe( (res: any) => {
      if (!res.error) {
        this.forgotPassword = false;
        this.verifySms = false;
        this.confirmPass = false;
        this.passwordReseted = true;
      }
    });
  }

  verifyPhoneFunc() {
    this.validateConfirmPhone();
    if (this.error.confirmPhone.bool) {
      return false;
    }
    this.signInService.sendSms({phoneNumber: this.passVeryfication.phoneNumber}).subscribe((resp: any) => {
      if ( !resp.error) {
        this.forgotPassword = false;
        this.verifySms = true;
        this.confirmPass = false;
      } else {
        this.error.phoneNumber.bool = true;
        this.error.phoneNumber.message = 'Առկա են Տեխնիկական խնդիրներ, խնդրում ենք կապնվել օպերատորի հետ';
      }
    });


  }

  verifySmsFunc() {
    this.validateSmsCode();
    if (this.error.sms.bool) {
      return false;
    }
    this.signInService.confirmSmsCode({phoneNumber: this.passVeryfication.phoneNumber, sms: this.passVeryfication.smsCode})
      .subscribe((res: any) => {
      if ( !res.error) {
        this.forgotPassword = false;
        this.verifySms = false;
        this.confirmPass = true;
      } else {
        this.error.sms.bool = true;
        this.error.sms.message = 'Առկա են Տեխնիկական խնդիրներ, խնդրում ենք կապնվել օպերատորի հետ';
      }
    });
  }





}
