import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  sent: boolean = false;
  textButton: string = "Send";
  email: string;
  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.textButton = "Login"
    this.authService.forgotPassword(this.email)
      .pipe()
      .subscribe(data => {
        this.sent = true;
        console.log('ok')
      },
        (error) => {
          this.toastr.warning(error.error.message)
        }
      );
  }

}