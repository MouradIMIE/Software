import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({ 
    selector: 'statistics', 
    templateUrl: './statistics.component.html', 
    styleUrls: ['./statistics.component.scss'] 
}) 

export class StatisticsComponent implements OnInit{
    public pieChartOptions: ChartOptions = {
        responsive: true,
    };

    public barChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['Hip/Hop', 'Rap'], 'Classic'];
    public pieChartData: SingleDataSet = [500, 300];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public barChartLabels: Label[] = ['15-18', '18-22', '22-25', '25-30', '30-35', '35+'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
        { data: [46, 25, 10, 5, 2, 3, 9], label: 'Age of users in %' },
      ];

    constructor(){
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    ngOnInit() : void {
     
    }

}