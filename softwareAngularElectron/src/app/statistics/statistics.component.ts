import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, defaultColors } from 'ng2-charts';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersDataList, CustomerDataElement } from 'src/app/types/customersData.type';

@Component({
    selector: 'statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

    adminConnected = localStorage.getItem('firstname');
    birthDateList: Array<CustomerDataElement> = [];
    public from15to18 = 0;
    public from19to22 = 0;
    public from23to26 = 0;
    public from27to30 = 0;
    public from31to35 = 0;
    public over35 = 0;
    public subscribed = 0;
    public unsubscribed = 0;

    public pieChartOptions: ChartOptions = {
        responsive: true,
    };

    public barChartOptions: ChartOptions = {
        responsive: true,
    };
    
    public pieChartLabels: Label[] = ['subscribed', 'No subscribed'];
    public pieChartData: SingleDataSet = [this.subscribed,this.unsubscribed];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public barChartLabels: Label[] = ['15-18', '19-22', '23-26', '27-30', '31-35', '35+'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
        { data: [this.from15to18, this.from19to22, this.from23to26, this.from27to30, this.from31to35, this.over35], label: 'Age of users in %' },
    ];

    constructor(private router: Router, private authService: AuthService) {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    ngOnInit(): void {
        this.getBirthDate();
        this.getSubscriptionStatistics();
    }
    // Get birhtDate to make stats
    getBirthDate(): void {
        this.authService.getCustomersData(localStorage.getItem('token'))
            .pipe()
            .subscribe((data: CustomersDataList) => {
                for (let i = 0; i < data.customers.length; i++) {
                    let elem: CustomerDataElement = { dateOfBirth: '', idSubscriptionStripe: '' };
                    elem.dateOfBirth = data.customers[i].dateOfBirth;
                    var resultAge: number = new Date().getFullYear() - parseInt(elem.dateOfBirth.slice(0, 4))
                    if (15 <= resultAge && resultAge <= 18) {
                        this.from15to18 += 1;
                    }
                    if (19 <= resultAge && resultAge <= 22) {
                        this.from19to22 += 1;
                    }
                    if (23 <= resultAge && resultAge <= 26) {
                        this.from23to26 += 1;
                    }
                    if (27 <= resultAge && resultAge <= 30) {
                        this.from27to30 += 1;
                    }
                    if (31 <= resultAge && resultAge <= 35) {
                        this.from31to35 += 1;
                    }
                    if (35 <= resultAge) {
                        this.over35 += 1;
                    }
                    this.birthDateList.push(elem);
                }
                this.from15to18 = Math.round((this.from15to18 * 100) / data.customers.length);
                this.from19to22 = Math.round((this.from19to22 * 100) / data.customers.length);
                this.from23to26 = Math.round((this.from23to26 * 100) / data.customers.length);
                this.from27to30 = Math.round((this.from27to30 * 100) / data.customers.length);
                this.from31to35 = Math.round((this.from31to35 * 100) / data.customers.length);
                this.over35 = (this.over35 * 100) / data.customers.length;

                for (let i = 0; i <= 6; i++) {
                    this.barChartData[0].data.pop();
                }
                (this.barChartData[0].data as number[]).push(this.from15to18);
                (this.barChartData[0].data as number[]).push(this.from19to22);
                (this.barChartData[0].data as number[]).push(this.from23to26);
                (this.barChartData[0].data as number[]).push(this.from27to30);
                (this.barChartData[0].data as number[]).push(this.from31to35);
                (this.barChartData[0].data as number[]).push(this.over35);
            })
    }

    getSubscriptionStatistics(): void {
        this.authService.getCustomersData(localStorage.getItem('token'))
            .pipe()
            .subscribe((data: CustomersDataList) => {
                for (let i = 0; i < data.customers.length; i++) {
                    let elem: CustomerDataElement = { dateOfBirth: '', idSubscriptionStripe: '' };
                    elem.idSubscriptionStripe = data.customers[i].idSubscriptionStripe;
                    if (elem.idSubscriptionStripe === "") {
                        this.unsubscribed += 1;
                    }
                    else {
                        this.subscribed += 1;
                    }
                }
                this.unsubscribed = (this.unsubscribed / data.customers.length) * 100;
                this.subscribed = (this.subscribed / data.customers.length) * 100;           
                this.pieChartData = [Math.round(this.subscribed*100)/100,Math.round(this.unsubscribed*100)/100];
            })
    }


    // ------- Logout -------

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