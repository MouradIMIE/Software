import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdminRegister } from '../types/adminRegister.type';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'adminPage',
    templateUrl: './adminPage.component.html',
    styleUrls: ['./adminPage.component.scss']
})

export class AdminPageComponent implements OnInit {

    registerForm: FormGroup;
    isSubmitted: boolean = false;

    constructor(private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) {

    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            createdBy: localStorage.getItem('firstname'),
        })
    }

    get formControls() {
        return this.registerForm.controls;
    }

    register(): void {
        console.log(this.registerForm.value);
        this.isSubmitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.authService.register(this.registerForm.value)
            .pipe()
            .subscribe((data: AdminRegister) => {
                console.log(data.admin);
                this.router.navigateByUrl('/admin');
                this.toastr.success('You can now close the modal', 'New admin added');
            },
                (error) => {
                    this.toastr.warning(error.error.message)
                }
            );
    }

    // ----- LOGOUT ----- // 
    logOut(): void {
        this.authService.logout(localStorage.getItem('token'))
            .pipe()
            .subscribe(data => {
                localStorage.setItem('token', '');
                this.router.navigateByUrl('/login');
            });
    }


}