import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminAuth } from '../types/adminAuth.type'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isSubmitted: boolean = false;
    constructor(private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) { }


    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }

    get formControls() {
        return this.loginForm.controls;
    }

    login(): void {
        console.log(this.loginForm.value);
        this.isSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.loginForm.value)
            .pipe()
            .subscribe((data: AdminAuth) => {
                console.log(data.admin);
                localStorage.setItem('token', data.admin.token);
                localStorage.setItem('firstname', data.admin.firstname);
                this.router.navigateByUrl('/radio');
                this.toastr.success('Successfuly connected');
            },
                (error) => {
                    this.toastr.warning(error.error.message)
                }
            );

    }

}