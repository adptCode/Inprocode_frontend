import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartjsService } from '../../services/chartjs.service';
import { Dates } from '../../interfaces/dates';

Chart.register(...registerables)

@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [],
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.css'
})
export class ChartjsComponent implements OnInit {

  chartData: Dates[] = [];
  labelData: number[]= [];
  realData: number[]= [];
  colorData: string[]= [];

  constructor(private _chartjsService: ChartjsService) {}


  ngOnInit(): void {
    this.getChartData();
  }

  getChartData(){

    this._chartjsService.getDates().subscribe(item => {
      this.chartData = item;
      if(this.chartData != null) {
        this.chartData.map(o => {
          this.labelData.push(o.year);
          this.realData.push(o.amount);
          this.colorData.push(o.colorcode);
        })
        this.Renderbarchar(this.labelData,this.realData,this.colorData);
        this.Renderpiechar(this.labelData,this.realData,this.colorData);
      }
    })
  }

  Renderbarchar(labelData:any, valueData:any, colorData:any) {
    this.Renderchart(labelData,valueData,colorData,'barchart', 'bar')
  }

  Renderpiechar(labelData:any, valueData:any, colorData:any) {
    this.Renderchart(labelData,valueData,colorData,'piechart', 'pie')
  }

  Renderchart(labelData:any, valueData:any, colorData:any, chartId:string, chartType:any) {
    const myChar = new Chart(chartId, {
      type: chartType,
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Sales',
            data: valueData,
            backgroundColor: colorData
          }
        ]
      },
      options: {

      }
    })
  }

}


