import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdminRegister } from '../types/adminRegister.type';
import { ToastrService } from 'ngx-toastr';
import { AdminList, AdminElement } from '../types/adminList.type';
@Component({
    selector: 'adminPage',
    templateUrl: './adminPage.component.html',
    styleUrls: ['./adminPage.component.scss']
})

export class AdminPageComponent implements OnInit {

    adminConnected = localStorage.getItem('firstname');
    adminList: Array<AdminElement> = [];
    registerForm: FormGroup;
    isSubmitted: boolean = false;

    constructor(private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) {

    }

    ngOnInit(): void {
        this.getAdmin();
        this.registerForm = this.formBuilder.group({
            firstname : ['', Validators.required],
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
                let elem: AdminElement = { firstname: '', lastname: '', email: '', createdBy: '' };
                    elem.firstname = data.admin.firstname;
                    elem.lastname = data.admin.lastname;
                    elem.email = data.admin.email;
                    elem.createdBy = localStorage.getItem("firstname");
                    this.adminList.push(elem);
                this.router.navigateByUrl('/admin');
                this.toastr.success('You can now close the modal', 'New admin added');
            },
                (error) => {
                    this.toastr.warning(error.error.message)
                }
            );
    }

    // ----- GetAdmins ----- //

    getAdmin(): void {
        this.authService.getAdmins(localStorage.getItem('token'))
            .pipe()
            .subscribe((data: AdminList) => {
                for (let i = 0; i < data.admins.length; i++) {
                    let elem: AdminElement = { firstname: '', lastname: '', email: '', createdBy: '' };
                    elem.firstname = data.admins[i].firstname;
                    elem.lastname = data.admins[i].lastname;
                    elem.email = data.admins[i].email;
                    elem.createdBy = data.admins[i].createdBy;
                    this.adminList.push(elem);
                }
                console.log(this.adminList);
            })
    }

    // ----- LOGOUT ----- // 
    logOut(): void {
        this.authService.logout(localStorage.getItem('token'))
            .pipe()
            .subscribe(data => {
                localStorage.setItem('token', '');
                localStorage.setItem('firstname', '');
                this.router.navigateByUrl('/login');
            });
    }

}